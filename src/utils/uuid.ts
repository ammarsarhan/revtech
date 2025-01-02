export default function generateRandomUUID(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let uuid = '';
    for (let i = 0; i < length; i++) {
      uuid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uuid;
}