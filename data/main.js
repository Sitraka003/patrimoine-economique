export default async function getData() {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error(`status de l'erreur: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur!', error);
        return [];
    }
}