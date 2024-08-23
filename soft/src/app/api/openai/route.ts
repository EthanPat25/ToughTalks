import { SendMessage } from 'src/utils/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let MessageResponse = await SendMessage(body);
    return new Response(JSON.stringify(MessageResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  catch (error) {
    console.log("Error");
  }
}
