export async function receiveMessage() {
    const message = await  fetch('https://e-connect-server-mbappy404s-projects.vercel.app/messages', {
        cache: 'no-store'
    })
    return message.json();
}