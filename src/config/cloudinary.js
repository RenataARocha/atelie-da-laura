// ============================================================================
// CONFIGURAÇÃO DO CLOUDINARY
// ============================================================================

export const CLOUDINARY_CONFIG = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'donxqmqjf',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_unsigned_atelie',
};

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

/**
 * Faz upload de uma imagem para o Cloudinary
 */
export const uploadImageToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📤 UPLOAD CLOUDINARY');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Cloud Name:', CLOUDINARY_CONFIG.cloudName);
        console.log('Upload Preset:', CLOUDINARY_CONFIG.uploadPreset);
        console.log('Arquivo:', file.name);
        console.log('Tamanho:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        console.log('📊 Resposta Cloudinary:', data);

        if (!response.ok) {
            console.error('❌ Erro completo:', data);
            throw new Error(data.error?.message || 'Erro ao fazer upload');
        }

        console.log('✅ Upload bem-sucedido!');
        console.log('🔗 URL:', data.secure_url);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return {
            url: data.secure_url,
            publicId: data.public_id,
        };
    } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ ERRO NO UPLOAD');
        console.error('Mensagem:', error.message);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        throw error;
    }
};

/**
 * Valida arquivo de imagem
 */
export const validarImagem = (file) => {
    if (!file.type.startsWith('image/')) {
        return {
            valido: false,
            erro: 'Arquivo deve ser uma imagem (JPG, PNG, etc)'
        };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return {
            valido: false,
            erro: 'Imagem deve ter no máximo 5MB'
        };
    }

    return { valido: true, erro: '' };
};