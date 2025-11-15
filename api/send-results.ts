import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const results = request.body;

    const emailHtml = `
      <h1>Nouveaux résultats de l'évaluation de sécurité</h1>
      <p>Un participant vient de terminer le test pratique.</p>
      
      <h2>Informations du Participant</h2>
      <ul>
        <li><strong>Prénom:</strong> ${results.userInfo.firstName}</li>
        <li><strong>Nom:</strong> ${results.userInfo.lastName}</li>
        <li><strong>Email:</strong> ${results.userInfo.email}</li>
      </ul>
      <hr>
      
      <h2>Test de Phishing</h2>
      <p>Réponses : ${results.phishingAnswers.join(', ') || 'Non répondu'}</p>
      <hr>
      
      <h2>Test de Mot de Passe</h2>
      <p><strong>Mot de passe créé :</strong> <code>${results.passwordTest.password}</code></p>
      <p><strong>Explication :</strong> <em>${results.passwordTest.explanation}</em></p>
      <hr>
      
      <h2>Test de Réaction à Incident</h2>
      <p><strong>Plan d'action :</strong></p>
      <pre>${results.incidentResponse}</pre>
    `;

    const fromAddress = 'onboarding@resend.dev';
    const toAddress = 'alainmomeni01@gmail.com';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `Résultats de ${results.userInfo.firstName} ${results.userInfo.lastName}`,
      replyTo: results.userInfo.email, // <--- CORRECTION ICI (reply_to -> replyTo)
      html: emailHtml,
    });

    if (error) {
      console.error({ error });
      return response.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.', error });
    }

    return response.status(200).json({ message: 'Email envoyé avec succès.', data });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Une erreur serveur est survenue.' });
  }
}