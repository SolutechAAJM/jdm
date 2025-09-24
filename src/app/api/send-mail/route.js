const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request) {
  try {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    const { name, email, message, destination, origin } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Todos los campos son requeridos' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }


    const emailJSPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY, 
      template_params: {
        from_name: name,
        from_email: email,
        to_email: destination,
        subject: `Nuevo mensaje de contacto de ${name}`,
        message: message,
        origin: origin,
        date: new Date().toLocaleString('es-ES')
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailJSPayload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error de EmailJS: ${response.status} - ${errorData}`);
    }

    return new Response(JSON.stringify({ message: 'Mensaje enviado exitosamente' }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error en API send-email:', error);

    return new Response(JSON.stringify({
      message: 'Error interno del servidor al enviar el mensaje',
      error: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Método no permitido' }), {
    status: 405,
    headers: { 
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}