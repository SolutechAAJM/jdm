export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Todos los campos son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILSENDER_TOKEN}`
      },
      body: JSON.stringify({
         from: {
          email: process.env.MAILFROM, 
          name: 'Pagina web JDM Consultoría'
        },
        to: [{ email: process.env.MAILSENDER_TO, name: 'MailSender' }, { email: process.env.MAILSENDER_TO1, name: 'MailSender' }, { email: process.env.MAILSENDER_TO2, name: 'MailSender' }],
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0B4059; border-bottom: 2px solid #4BC1F2; padding-bottom: 10px;">
                🚀 Nuevo mensaje de contacto
              </h2>
              <div style="margin-top: 20px;">
                <p><strong>👤 Nombre:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>💬 Mensaje:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <p>📅 Enviado el: ${new Date().toLocaleString('es-ES')}</p>
                <p>🌐 Desde tu sitio web</p>
              </div>
            </div>
          </div>
        `,
        text: `
Nuevo mensaje de contacto:
Nombre: ${name}
Email: ${email}
Mensaje: ${message}

Enviado el: ${new Date().toLocaleString('es-ES')}
        `.trim()
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error de MailSender: ${response.status} - ${errorData}`);
    }

    return new Response(JSON.stringify({ message: 'Mensaje enviado exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API send-email:', error);

    return new Response(JSON.stringify({
      message: 'Error interno del servidor al enviar el mensaje',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Método no permitido' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}