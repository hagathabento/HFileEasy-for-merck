/*
===============================
    HFileEasy - Translations
===============================
Sistema de internacionalização para Português, Inglês e Alemão
Desenvolvido por Hagatha Pereira - 2025
*/

// ===== CONFIGURAÇÕES DE IDIOMAS =====
const TRANSLATIONS = {
    pt: {
        // ===== CABEÇALHO =====
        title: "HFileEasy",
        subtitle: "Transforme suas imagens em PDF com Facilidade",
        
        // ===== SEÇÃO DE UPLOAD =====
        uploadTitle: "Arraste suas imagens aqui",
        uploadSubtitle: "ou clique para selecionar arquivos",
        uploadButton: "Escolher Imagens",
        
        // ===== PREVIEW =====
        previewTitle: "🖼️ Visualização das Imagens",
        previewInstructionsDesktop: "Arraste as imagens para reordenar como aparecerão no PDF",
        previewInstructionsMobile: "Use os botões: ↑ subir | ↓ descer | ⌘ escolher posição",
        clearAllButton: "Limpar Tudo",
        resetOrderButton: "Resetar Ordem",
        
        // ===== CONFIGURAÇÕES =====
        settingsTitle: "⚙️ Configurações do PDF",
        textSettingsTitle: "📝 Configurações de Texto",
        titleLabel: "📄 Título do PDF (Primeira Página)",
        titlePlaceholder: "Ex: Relatório Mensal",
        titleHelp: "Aparecerá como título principal na primeira página",
        authorLabel: "👤 Elaborado por (Rodapé)",
        authorPlaceholder: "Ex: João Silva",
        authorHelp: "Aparecerá no rodapé de todas as páginas",
        filenameLabel: "📁 Nome do Arquivo de Saída",
        filenamePlaceholder: "Ex: relatorio_mensal",
        filenameHelp: "Nome final do arquivo PDF (sem extensão)",
        
        additionalOptionsTitle: "🎨 Opções Adicionais",
        imagesPerPageLabel: "📄 Imagens por Página",
        imagesPerPage1: "1 imagem por página",
        imagesPerPage2: "2 imagens por página",
        numberPagesLabel: "Numerar Páginas",
        generateButton: "📄 Gerar PDF",
        
        // ===== PROGRESSO =====
        progressTitle: "📊 Processando...",
        progressPreparing: "Preparando imagens...",
        progressProcessing: "Processando suas imagens...",
        progressFinalizing: "Finalizando PDF...",
        
        // ===== MODAL SUCESSO =====
        successTitle: "✅ PDF Criado com Sucesso!",
        successMessage: "Seu PDF foi gerado e o download iniciará automaticamente.",
        closeButton: "Fechar",
        
        // ===== MODAL EDIÇÃO =====
        editTitle: "✏️ Editar Imagem",
        rotationTitle: "🔄 Rotação",
        rotateLeft: "⤺ 90° Esq",
        rotateRight: "⤻ 90° Dir",
        rotate180: "↻ 180°",
        cropTitle: "✂️ Corte",
        cropButton: "✂️ Cortar",
        cropReset: "🔄 Redefinir",
        cropHelp: "Clique e arraste no canvas para definir área de corte",
        cancelButton: "Cancelar",
        saveButton: "Salvar",
        
        // ===== MODAL POSIÇÃO =====
        positionTitle: "📍 Escolher Posição",
        positionImage: "Imagem:",
        positionSelect: "Selecione a nova posição:",
        positionCurrent: "Atual",
        
        // ===== MENSAGENS =====
        fileTypeError: "Tipo de arquivo não permitido: {type}. Use PNG, JPEG, GIF ou WebP.",
        fileSizeError: "Arquivo muito grande: {size}. Máximo permitido: 50MB.",
        noImagesError: "⚠️ Adicione pelo menos uma imagem para gerar o PDF.",
        imageNotFoundError: "Erro: Imagem não encontrada",
        editDataError: "Erro: Dados de edição inválidos",
        invalidImageError: "Erro: Imagem inválida",
        editSavedSuccess: "Imagem editada com sucesso!",
        orderResetSuccess: "Ordem original restaurada!",
        orderUpdatedSuccess: "Ordem das imagens atualizada!",
        imageMoved: "Imagem movida para posição {position}!",
        cropModeActivated: "Modo de corte ativado - Clique e arraste para definir área",
        cropModeDeactivated: "Modo de corte desativado",
        cropResetSuccess: "Área de corte redefinida",
        rotatedSuccess: "Imagem girada {direction} {degrees}°",
        samePositionInfo: "✅ Imagem já está na posição selecionada!",
        
        // ===== CONFIGURAÇÕES PDF =====
        configTitle: "📋 CONFIGURAÇÕES DO PDF:",
        configTitleField: "Título:",
        configAuthorField: "Elaborado por:",
        configFilenameField: "Nome do arquivo:",
        configImagesField: "Imagens:",
        configImagesCount: "{count} imagem(ns)",
        configImagesPerPage: "Imagens por página: {count}",
        configNumberPages: "✅ Numerar páginas",
        configNoNumberPages: "❌ Numerar páginas",
        configContinue: "Deseja continuar?",
        
        // ===== PROCESSAMENTO =====
        processingImage: "Processando imagem {current} de {total}",
        
        // ===== RODAPÉ =====
        footerText: "Desenvolvido por Hagatha Pereira - 2025 | hagatha.pereira@merckgroup.com",
        
        // ===== ERROS DEPENDÊNCIAS =====
        jsPDFError: "Erro: Biblioteca jsPDF não carregada. Verifique sua conexão com a internet.",
        dependenciesLoaded: "Todas as dependências carregadas com sucesso",
        
        // ===== DIREÇÕES =====
        directionLeft: "esquerda",
        directionRight: "direita"
    },
    
    en: {
        // ===== HEADER =====
        title: "HFileEasy",
        subtitle: "Transform your images into PDF with Ease",
        
        // ===== UPLOAD SECTION =====
        uploadTitle: "Drag your images here",
        uploadSubtitle: "or click to select files",
        uploadButton: "Choose Images",
        
        // ===== PREVIEW =====
        previewTitle: "🖼️ Image Preview",
        previewInstructionsDesktop: "Drag images to reorder how they will appear in the PDF",
        previewInstructionsMobile: "Use buttons: ↑ move up | ↓ move down | ⌘ choose position",
        clearAllButton: "Clear All",
        resetOrderButton: "Reset Order",
        
        // ===== SETTINGS =====
        settingsTitle: "⚙️ PDF Settings",
        textSettingsTitle: "📝 Text Settings",
        titleLabel: "📄 PDF Title (First Page)",
        titlePlaceholder: "e.g. Monthly Report",
        titleHelp: "Will appear as main title on first page",
        authorLabel: "👤 Prepared by (Footer)",
        authorPlaceholder: "e.g. John Smith",
        authorHelp: "Will appear in footer of all pages",
        filenameLabel: "📁 Output File Name",
        filenamePlaceholder: "e.g. monthly_report",
        filenameHelp: "Final PDF file name (without extension)",
        
        additionalOptionsTitle: "🎨 Additional Options",
        imagesPerPageLabel: "📄 Images per Page",
        imagesPerPage1: "1 image per page",
        imagesPerPage2: "2 images per page",
        numberPagesLabel: "Number Pages",
        generateButton: "📄 Generate PDF",
        
        // ===== PROGRESS =====
        progressTitle: "📊 Processing...",
        progressPreparing: "Preparing images...",
        progressProcessing: "Processing your images...",
        progressFinalizing: "Finalizing PDF...",
        
        // ===== SUCCESS MODAL =====
        successTitle: "✅ PDF Created Successfully!",
        successMessage: "Your PDF has been generated and download will start automatically.",
        closeButton: "Close",
        
        // ===== EDIT MODAL =====
        editTitle: "✏️ Edit Image",
        rotationTitle: "🔄 Rotation",
        rotateLeft: "⤺ 90° Left",
        rotateRight: "⤻ 90° Right",
        rotate180: "↻ 180°",
        cropTitle: "✂️ Crop",
        cropButton: "✂️ Crop",
        cropReset: "🔄 Reset",
        cropHelp: "Click and drag on canvas to define crop area",
        cancelButton: "Cancel",
        saveButton: "Save",
        
        // ===== POSITION MODAL =====
        positionTitle: "📍 Choose Position",
        positionImage: "Image:",
        positionSelect: "Select new position:",
        positionCurrent: "Current",
        
        // ===== MESSAGES =====
        fileTypeError: "File type not allowed: {type}. Use PNG, JPEG, GIF or WebP.",
        fileSizeError: "File too large: {size}. Maximum allowed: 50MB.",
        noImagesError: "⚠️ Add at least one image to generate PDF.",
        imageNotFoundError: "Error: Image not found",
        editDataError: "Error: Invalid edit data",
        invalidImageError: "Error: Invalid image",
        editSavedSuccess: "Image edited successfully!",
        orderResetSuccess: "Original order restored!",
        orderUpdatedSuccess: "Image order updated!",
        imageMoved: "Image moved to position {position}!",
        cropModeActivated: "Crop mode activated - Click and drag to define area",
        cropModeDeactivated: "Crop mode deactivated",
        cropResetSuccess: "Crop area reset",
        rotatedSuccess: "Image rotated {direction} {degrees}°",
        samePositionInfo: "✅ Image is already in selected position!",
        
        // ===== PDF CONFIG =====
        configTitle: "📋 PDF SETTINGS:",
        configTitleField: "Title:",
        configAuthorField: "Prepared by:",
        configFilenameField: "File name:",
        configImagesField: "Images:",
        configImagesCount: "{count} image(s)",
        configImagesPerPage: "Images per page: {count}",
        configNumberPages: "✅ Number pages",
        configNoNumberPages: "❌ Number pages",
        configContinue: "Do you want to continue?",
        
        // ===== PROCESSING =====
        processingImage: "Processing image {current} of {total}",
        
        // ===== FOOTER =====
        footerText: "Developed by Hagatha Pereira - 2025 | hagatha.pereira@merckgroup.com",
        
        // ===== DEPENDENCY ERRORS =====
        jsPDFError: "Error: jsPDF library not loaded. Check your internet connection.",
        dependenciesLoaded: "All dependencies loaded successfully",
        
        // ===== DIRECTIONS =====
        directionLeft: "left",
        directionRight: "right"
    },
    
    de: {
        // ===== KOPFZEILE =====
        title: "HFileEasy",
        subtitle: "Verwandeln Sie Ihre Bilder mühelos in PDF",
        
        // ===== UPLOAD-BEREICH =====
        uploadTitle: "Ziehen Sie Ihre Bilder hierher",
        uploadSubtitle: "oder klicken Sie, um Dateien auszuwählen",
        uploadButton: "Bilder Auswählen",
        
        // ===== VORSCHAU =====
        previewTitle: "🖼️ Bildvorschau",
        previewInstructionsDesktop: "Ziehen Sie Bilder, um die Reihenfolge im PDF zu ändern",
        previewInstructionsMobile: "Verwenden Sie Tasten: ↑ nach oben | ↓ nach unten | ⌘ Position wählen",
        clearAllButton: "Alle Löschen",
        resetOrderButton: "Reihenfolge Zurücksetzen",
        
        // ===== EINSTELLUNGEN =====
        settingsTitle: "⚙️ PDF-Einstellungen",
        textSettingsTitle: "📝 Text-Einstellungen",
        titleLabel: "📄 PDF-Titel (Erste Seite)",
        titlePlaceholder: "z.B. Monatsbericht",
        titleHelp: "Erscheint als Haupttitel auf der ersten Seite",
        authorLabel: "👤 Erstellt von (Fußzeile)",
        authorPlaceholder: "z.B. Max Mustermann",
        authorHelp: "Erscheint in der Fußzeile aller Seiten",
        filenameLabel: "📁 Name der Ausgabedatei",
        filenamePlaceholder: "z.B. monatsbericht",
        filenameHelp: "Endgültiger PDF-Dateiname (ohne Erweiterung)",
        
        additionalOptionsTitle: "🎨 Zusätzliche Optionen",
        imagesPerPageLabel: "📄 Bilder pro Seite",
        imagesPerPage1: "1 Bild pro Seite",
        imagesPerPage2: "2 Bilder pro Seite",
        numberPagesLabel: "Seiten Nummerieren",
        generateButton: "📄 PDF Erstellen",
        
        // ===== FORTSCHRITT =====
        progressTitle: "📊 Verarbeitung...",
        progressPreparing: "Bilder werden vorbereitet...",
        progressProcessing: "Ihre Bilder werden verarbeitet...",
        progressFinalizing: "PDF wird finalisiert...",
        
        // ===== ERFOLGS-MODAL =====
        successTitle: "✅ PDF Erfolgreich Erstellt!",
        successMessage: "Ihr PDF wurde erstellt und der Download startet automatisch.",
        closeButton: "Schließen",
        
        // ===== BEARBEITUNGS-MODAL =====
        editTitle: "✏️ Bild Bearbeiten",
        rotationTitle: "🔄 Drehung",
        rotateLeft: "⤺ 90° Links",
        rotateRight: "⤻ 90° Rechts",
        rotate180: "↻ 180°",
        cropTitle: "✂️ Zuschneiden",
        cropButton: "✂️ Zuschneiden",
        cropReset: "🔄 Zurücksetzen",
        cropHelp: "Klicken und ziehen Sie auf der Leinwand, um den Zuschnittbereich zu definieren",
        cancelButton: "Abbrechen",
        saveButton: "Speichern",
        
        // ===== POSITIONS-MODAL =====
        positionTitle: "📍 Position Wählen",
        positionImage: "Bild:",
        positionSelect: "Neue Position auswählen:",
        positionCurrent: "Aktuell",
        
        // ===== NACHRICHTEN =====
        fileTypeError: "Dateityp nicht erlaubt: {type}. Verwenden Sie PNG, JPEG, GIF oder WebP.",
        fileSizeError: "Datei zu groß: {size}. Maximum erlaubt: 50MB.",
        noImagesError: "⚠️ Fügen Sie mindestens ein Bild hinzu, um PDF zu erstellen.",
        imageNotFoundError: "Fehler: Bild nicht gefunden",
        editDataError: "Fehler: Ungültige Bearbeitungsdaten",
        invalidImageError: "Fehler: Ungültiges Bild",
        editSavedSuccess: "Bild erfolgreich bearbeitet!",
        orderResetSuccess: "Ursprüngliche Reihenfolge wiederhergestellt!",
        orderUpdatedSuccess: "Bildreihenfolge aktualisiert!",
        imageMoved: "Bild zu Position {position} verschoben!",
        cropModeActivated: "Zuschnittmodus aktiviert - Klicken und ziehen, um Bereich zu definieren",
        cropModeDeactivated: "Zuschnittmodus deaktiviert",
        cropResetSuccess: "Zuschnittbereich zurückgesetzt",
        rotatedSuccess: "Bild um {degrees}° nach {direction} gedreht",
        samePositionInfo: "✅ Bild ist bereits in der gewählten Position!",
        
        // ===== PDF-KONFIGURATION =====
        configTitle: "📋 PDF-EINSTELLUNGEN:",
        configTitleField: "Titel:",
        configAuthorField: "Erstellt von:",
        configFilenameField: "Dateiname:",
        configImagesField: "Bilder:",
        configImagesCount: "{count} Bild(er)",
        configImagesPerPage: "Bilder pro Seite: {count}",
        configNumberPages: "✅ Seiten nummerieren",
        configNoNumberPages: "❌ Seiten nummerieren",
        configContinue: "Möchten Sie fortfahren?",
        
        // ===== VERARBEITUNG =====
        processingImage: "Verarbeite Bild {current} von {total}",
        
        // ===== FUSSZEILE =====
        footerText: "Entwickelt von Hagatha Pereira - 2025 | hagatha.pereira@merckgroup.com",
        
        // ===== ABHÄNGIGKEITSFEHLER =====
        jsPDFError: "Fehler: jsPDF-Bibliothek nicht geladen. Überprüfen Sie Ihre Internetverbindung.",
        dependenciesLoaded: "Alle Abhängigkeiten erfolgreich geladen",
        
        // ===== RICHTUNGEN =====
        directionLeft: "links",
        directionRight: "rechts"
    }
};

// ===== CONFIGURAÇÃO PADRÃO =====
let currentLanguage = 'pt'; // Idioma padrão: Português

// ===== FUNÇÃO PARA OBTER TRADUÇÃO =====
function t(key, params = {}) {
    let translation = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['pt'][key] || key;
    
    // Substituir parâmetros na tradução
    Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
}

// ===== FUNÇÃO PARA MUDAR IDIOMA =====
function changeLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        currentLanguage = lang;
        updateInterfaceTexts();
        localStorage.setItem('hfileeasy_language', lang);
        console.log(`Idioma alterado para: ${lang}`);
    }
}

// ===== FUNÇÃO PARA CARREGAR IDIOMA SALVO =====
function loadSavedLanguage() {
    const savedLang = localStorage.getItem('hfileeasy_language');
    if (savedLang && TRANSLATIONS[savedLang]) {
        currentLanguage = savedLang;
    }
}

// ===== FUNÇÃO PARA ATUALIZAR TEXTOS DA INTERFACE =====
function updateInterfaceTexts() {
    // Atualizar elementos com data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
            element.placeholder = translation;
        } else if (element.tagName === 'OPTION') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Atualizar título da página
    document.title = t('title') + ' - ' + t('subtitle');
    
    console.log(`Interface atualizada para o idioma: ${currentLanguage}`);
}

// ===== FUNÇÃO DE DEBUG =====
function debugTranslationSystem() {
    console.log('=== DEBUG SISTEMA DE TRADUÇÕES ===');
    console.log('Idioma atual:', currentLanguage);
    console.log('Idiomas disponíveis:', Object.keys(TRANSLATIONS));
    console.log('Total de elementos com data-translate:', document.querySelectorAll('[data-translate]').length);
    console.log('Seletor de idioma encontrado:', !!document.getElementById('languageSelect'));
    
    // Testar algumas traduções
    console.log('Teste t("title"):', t('title'));
    console.log('Teste t("subtitle"):', t('subtitle'));
    console.log('================================');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de traduções...');
    
    // Carregar idioma salvo
    loadSavedLanguage();
    
    // Aguardar um pouco para garantir que todos os elementos estão carregados
    setTimeout(() => {
        updateInterfaceTexts();
        
        // Configurar o seletor de idioma
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = currentLanguage;
            console.log(`Seletor de idioma configurado para: ${currentLanguage}`);
        }
        
        // Debug
        debugTranslationSystem();
    }, 100);
});

// Exportar para uso global
window.t = t;
window.changeLanguage = changeLanguage;
window.updateInterfaceTexts = updateInterfaceTexts;
window.TRANSLATIONS = TRANSLATIONS;
