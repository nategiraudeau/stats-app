import { _storage as storage } from "./firebase";
import { v4 as uuid } from 'uuid';

export default storage;

export async function uploadProfileImage(base64: string): Promise<string> {
    const ref = storage.ref(`user-data/${uuid()}`);
    let data = base64.substring(base64.indexOf(',') + 1);

    const snap = await ref.putString(data, 'base64', {
        contentType: base64.substring(base64.indexOf(':' + 1), base64.indexOf(';' + 1)),
    });
    return await snap.ref.getDownloadURL();
}