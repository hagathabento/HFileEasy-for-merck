/*
===============================
    HFileEasy - JavaScript
===============================
Script principal da aplicação de conversão de imagens para PDF
Funcionalidades: Upload, ordenação, edição de imagens e geração de PDF
Desenvolvido por Hagatha Pereira - 2025
*/

// ===== VARIÁVEIS GLOBAIS =====
let imagensCarregadas = []; // Array com todas as imagens carregadas pelo usuário
let ordemOriginal = []; // Array com a ordem original das imagens (para função resetar)
let processandoPDF = false; // Flag para evitar múltiplas execuções simultâneas

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
// Executado quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventListeners(); // Configura todos os event listeners
    inicializarSliders(); // Função de compatibilidade
    inicializarSistemaIdiomas(); // Inicializa sistema de idiomas
    inicializarDataRodape(); // Inicializa campo de data com data atual
});

// ===== CONFIGURAÇÃO DOS EVENT LISTENERS =====
// Vincula eventos aos elementos HTML
function inicializarEventListeners() {
    const fileInput = document.getElementById('fileInput'); // Input oculto de arquivo
    const uploadArea = document.getElementById('uploadArea'); // Área de arrastar e soltar
    
    // Event listeners para upload de arquivos
    fileInput.addEventListener('change', handleFileSelect); // Seleção via botão
    uploadArea.addEventListener('dragover', handleDragOver); // Arrastar sobre a área
    uploadArea.addEventListener('drop', handleDrop); // Soltar arquivo
    uploadArea.addEventListener('dragleave', handleDragLeave); // Sair da área
    
    // Event listener para checkbox de incluir data
    const incluirDataCheckbox = document.getElementById('incluirData');
    const dataRodapeInput = document.getElementById('dataRodape');
    if (incluirDataCheckbox && dataRodapeInput) {
        incluirDataCheckbox.addEventListener('change', function() {
            dataRodapeInput.disabled = !incluirDataCheckbox.checked;
        });
        // Definir estado inicial
        dataRodapeInput.disabled = !incluirDataCheckbox.checked;
    }
}

// ===== INICIALIZAÇÃO SIMPLIFICADA =====
// Função mantida para compatibilidade com versões anteriores
function inicializarSliders() {
    // Função mantida para compatibilidade, mas sem funcionalidade
    console.log('Interface simplificada - sliders removidos');
}

// ===== INICIALIZAÇÃO DO SISTEMA DE IDIOMAS =====
function inicializarSistemaIdiomas() {
    // Carregar idioma salvo
    const savedLang = localStorage.getItem('hfileeasy_language');
    if (savedLang && window.TRANSLATIONS && window.TRANSLATIONS[savedLang]) {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLang;
            if (window.changeLanguage) {
                window.changeLanguage(savedLang);
            }
        }
    }
    console.log('Sistema de idiomas inicializado');
}

// ===== INICIALIZAÇÃO DO CAMPO DE DATA =====
function inicializarDataRodape() {
    const dataRodapeElement = document.getElementById('dataRodape');
    if (dataRodapeElement) {
        // Definir data atual como padrão
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        dataRodapeElement.value = dataFormatada;
        console.log('Campo de data inicializado com:', dataFormatada);
    }
}

// ===== ATUALIZAÇÃO DA INTERFACE APÓS MUDANÇA DE IDIOMA =====
function atualizarInterface() {
    // Validar imagens antes de atualizar interface
    validarImagensCarregadas();
    
    if (imagensCarregadas.length > 0) {
        document.getElementById('settingsSection').style.display = 'block';
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('uploadArea').classList.add('has-images');
        atualizarPreview();
    } else {
        document.getElementById('uploadArea').classList.remove('has-images');
    }
    
    // Atualizar textos se o sistema de tradução estiver disponível
    if (window.updateInterfaceTexts) {
        window.updateInterfaceTexts();
    }
}

// ===== VALIDAÇÃO DE ARQUIVOS =====
// Verifica se o arquivo atende aos critérios de formato e tamanho
function validarArquivo(file) {
    console.log('Validando arquivo:', file.name);
    
    // Tipos de imagem permitidos
    const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    const tamanhoMaximo = 50 * 1024 * 1024; // 50MB em bytes
    
    // Verifica se o tipo de arquivo é permitido
    if (!tiposPermitidos.includes(file.type)) {
        const message = window.t ? window.t('fileTypeError', {type: file.type}) : `Tipo de arquivo não permitido: ${file.type}. Use PNG, JPEG, GIF ou WebP.`;
        alert(message);
        return false;
    }
    
    // Verifica se o arquivo não excede o tamanho máximo
    if (file.size > tamanhoMaximo) {
        const message = window.t ? window.t('fileSizeError', {size: formatarTamanho(file.size)}) : `Arquivo muito grande: ${formatarTamanho(file.size)}. Máximo permitido: 50MB.`;
        alert(message);
        return false;
    }
    
    console.log('Arquivo validado com sucesso');
    return true;
}

// ===== MANIPULADORES DE DRAG AND DROP =====
// Conjunto de funções para gerenciar o arrastar e soltar de arquivos

// Evento quando arquivo é arrastado sobre a área
function handleDragOver(e) {
    e.preventDefault(); // Previne comportamento padrão
    e.stopPropagation(); // Para propagação do evento
    document.getElementById('uploadArea').classList.add('dragover'); // Adiciona estilo visual
}

// Evento quando arquivo sai da área de upload
function handleDragLeave(e) {
    e.preventDefault(); // Previne comportamento padrão
    e.stopPropagation(); // Para propagação do evento
    document.getElementById('uploadArea').classList.remove('dragover'); // Remove estilo visual
}

// Evento quando arquivo é solto na área
function handleDrop(e) {
    e.preventDefault(); // Previne comportamento padrão
    e.stopPropagation(); // Para propagação do evento
    document.getElementById('uploadArea').classList.remove('dragover'); // Remove estilo visual
    
    const files = Array.from(e.dataTransfer.files); // Converte FileList para Array
    processarArquivos(files); // Processa os arquivos soltos
}

// Evento quando arquivo é selecionado via botão
function handleFileSelect(e) {
    const files = Array.from(e.target.files); // Converte FileList para Array
    processarArquivos(files); // Processa os arquivos selecionados
}

// ===== PROCESSAMENTO DE ARQUIVOS =====
// Função principal para processar arquivos selecionados ou arrastados
function processarArquivos(files) {
    console.log('Processando', files.length, 'arquivos');
    
    // Filtra apenas arquivos que passaram na validação
    const arquivosValidos = files.filter(validarArquivo);
    
    // Se não há arquivos válidos, interrompe processamento
    if (arquivosValidos.length === 0) {
        return;
    }
    
    // Mostra indicador de carregamento
    mostrarLoading();
    
    // Processa cada arquivo usando Promise.all para paralelismo
    Promise.all(arquivosValidos.map(processarImagem))
        .then(imagens => {
            // Adiciona novas imagens ao array principal
            imagensCarregadas = [...imagensCarregadas, ...imagens];
            
            // Salva ordem original se for o primeiro carregamento
            if (ordemOriginal.length === 0) {
                ordemOriginal = [...imagensCarregadas];
            } else {
                ordemOriginal = [...ordemOriginal, ...imagens];
            }
            
            atualizarInterface(); // Atualiza interface com novas imagens
            esconderLoading(); // Esconde indicador de carregamento
        })
        .catch(erro => {
            console.error('Erro ao processar imagens:', erro);
            alert('Erro ao processar algumas imagens. Tente novamente.');
            esconderLoading(); // Esconde indicador mesmo em caso de erro
        });
}

// Processar uma imagem individual
function processarImagem(file) {
    console.log('Processando imagem:', file.name);
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            
            img.onload = function() {
                // Otimizar imagem
                const imagemOtimizada = otimizarImagem(img, file);
                
                const imagemProcessada = {
                    id: Date.now() + Math.random(),
                    nome: file.name || 'Imagem sem nome',
                    tamanho: file.size || 0,
                    tipo: file.type || 'image/jpeg',
                    largura: img.width || 800,
                    altura: img.height || 600,
                    dataUrl: imagemOtimizada.dataUrl || '',
                    canvas: imagemOtimizada.canvas || null
                };
                
                console.log('Imagem processada:', imagemProcessada.nome);
                resolve(imagemProcessada);
            };
            
            img.onerror = () => reject(new Error(`Erro ao carregar imagem: ${file.name}`));
            img.src = e.target.result;
        };
        
        reader.onerror = () => reject(new Error(`Erro ao ler arquivo: ${file.name}`));
        reader.readAsDataURL(file);
    });
}

// Otimização de imagens
function otimizarImagem(img, file, qualidade = 0.95) {
    console.log('Otimizando imagem:', file.name);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calcular dimensões mantendo proporção (máximo 2000x2000)
    const maxDimensao = 2000;
    let { width, height } = img;
    
    if (width > height) {
        if (width > maxDimensao) {
            height = (height * maxDimensao) / width;
            width = maxDimensao;
        }
    } else {
        if (height > maxDimensao) {
            width = (width * maxDimensao) / height;
            height = maxDimensao;
        }
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Desenhar imagem otimizada
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    
    // Converter para DataURL com qualidade especificada
    const dataUrl = canvas.toDataURL('image/jpeg', qualidade);
    
    console.log('Imagem otimizada:', `${width}x${height}`);
    
    return {
        dataUrl: dataUrl,
        canvas: canvas
    };
}

// Detectar se é dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

// Atualizar interface após carregar imagens
function atualizarInterface() {
    // Validar imagens antes de atualizar interface
    validarImagensCarregadas();
    
    if (imagensCarregadas.length > 0) {
        document.getElementById('settingsSection').style.display = 'block';
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('uploadArea').classList.add('has-images');
        atualizarPreview();
    } else {
        document.getElementById('uploadArea').classList.remove('has-images');
    }
}

// Atualizar preview das imagens
function atualizarPreview() {
    const container = document.getElementById('previewContainer');
    container.innerHTML = '';
    
    imagensCarregadas.forEach((imagem, index) => {
        // Validar se a imagem tem todas as propriedades necessárias
        if (!imagem || !imagem.dataUrl || !imagem.id) {
            console.error('Imagem inválida no índice:', index, imagem);
            return;
        }
        
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.draggable = true;
        previewItem.dataset.index = index;
        
        // Usar valores padrão se propriedades estiverem ausentes
        const nome = imagem.nome || `Imagem ${index + 1}`;
        const tamanho = imagem.tamanho || 0;
        const largura = imagem.largura || 0;
        const altura = imagem.altura || 0;
        
        // Botões de reordenação para mobile
        const mobileButtons = isMobile() ? `
            <div class="mobile-sort-buttons">
                <button class="mobile-sort-btn move-up" onclick="moverImagemPara('${imagem.id}', -1)" ${index === 0 ? 'disabled' : ''} data-tooltip="Mover para cima">↑</button>
                <button class="mobile-sort-btn move-down" onclick="moverImagemPara('${imagem.id}', 1)" ${index === imagensCarregadas.length - 1 ? 'disabled' : ''} data-tooltip="Mover para baixo">↓</button>
                <button class="mobile-sort-btn move-to-position" onclick="selecionarPosicaoImagem('${imagem.id}')" data-tooltip="Escolher posição">⌘</button>
            </div>
        ` : '';
        
        previewItem.innerHTML = `
            <div class="drag-handle">⋮⋮</div>
            <div class="order-number">${index + 1}</div>
            <img src="${imagem.dataUrl}" alt="${nome}">
            <div class="preview-info">
                <div class="preview-name">${nome}</div>
                <div class="preview-size">${formatarTamanho(tamanho)} - ${largura}x${altura}</div>
            </div>
            ${mobileButtons}
            <button class="edit-btn" onclick="editarImagem('${imagem.id}')">✏️</button>
            <button class="remove-btn" onclick="removerImagem('${imagem.id}')">×</button>
        `;
        
        // Adicionar event listeners para drag and drop
        previewItem.addEventListener('dragstart', handleDragStart);
        previewItem.addEventListener('dragend', handleDragEnd);
        previewItem.addEventListener('dragover', handleDragOver);
        previewItem.addEventListener('drop', handleDrop);
        previewItem.addEventListener('dragenter', handleDragEnter);
        previewItem.addEventListener('dragleave', handleDragLeave);
        
        // Adicionar event listeners para touch (mobile)
        previewItem.addEventListener('touchstart', handleTouchStart, { passive: false });
        previewItem.addEventListener('touchmove', handleTouchMove, { passive: false });
        previewItem.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        container.appendChild(previewItem);
    });
    
    // Atualizar visibilidade do botão "Resetar Ordem"
    const resetBtn = document.querySelector('button[onclick="resetarOrdem()"]');
    if (resetBtn) {
        resetBtn.style.display = ordemFoiAlterada() ? 'inline-block' : 'none';
    }
}

// Remover imagem
function removerImagem(id) {
    const indexParaRemover = imagensCarregadas.findIndex(img => img && img.id && img.id.toString() === id);
    
    if (indexParaRemover === -1) {
        console.error('Imagem não encontrada para remoção:', id);
        return;
    }
    
    imagensCarregadas = imagensCarregadas.filter(img => img && img.id && img.id.toString() !== id);
    ordemOriginal = ordemOriginal.filter(img => img && img.id && img.id.toString() !== id);
    atualizarPreview();
    
    if (imagensCarregadas.length === 0) {
        document.getElementById('settingsSection').style.display = 'none';
        document.getElementById('previewSection').style.display = 'none';
        document.getElementById('uploadArea').classList.remove('has-images');
    }
}

// Limpar todas as imagens
function limparTudo() {
    imagensCarregadas = [];
    ordemOriginal = [];
    document.getElementById('fileInput').value = '';
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('progressSection').style.display = 'none';
    document.getElementById('uploadArea').classList.remove('has-images');
}

// Resetar ordem das imagens
function resetarOrdem() {
    if (ordemOriginal.length > 0) {
        imagensCarregadas = [...ordemOriginal];
        atualizarPreview();
        mostrarFeedback('Ordem original restaurada!');
        debug('Ordem das imagens resetada');
    }
}

// Mostrar feedback temporário
function mostrarFeedback(mensagem) {
    // Remover feedback anterior se existir
    const feedbackAnterior = document.querySelector('.feedback-toast');
    if (feedbackAnterior) {
        feedbackAnterior.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'feedback-toast';
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Verificar se ordem foi alterada
function ordemFoiAlterada() {
    if (imagensCarregadas.length !== ordemOriginal.length) return true;
    
    for (let i = 0; i < imagensCarregadas.length; i++) {
        const imagemAtual = imagensCarregadas[i];
        const imagemOriginal = ordemOriginal[i];
        
        if (!imagemAtual || !imagemOriginal || imagemAtual.id !== imagemOriginal.id) {
            return true;
        }
    }
    return false;
}

// Gerar PDF
function gerarPDF() {
    // Validar imagens antes de gerar PDF
    validarImagensCarregadas();
    
    if (imagensCarregadas.length === 0) {
        const message = window.t ? window.t('noImagesError') : '⚠️ Adicione pelo menos uma imagem para gerar o PDF.';
        alert(message);
        return;
    }
    
    if (processandoPDF) {
        return;
    }
    
    // Obter e validar configurações
    const configuracoes = obterConfiguracoes();
    
    // Mostrar prévia das configurações
    if (!confirmarConfiguracoes(configuracoes)) {
        return;
    }
    
    // Debug antes de gerar PDF
    debug('Iniciando geração de PDF com', imagensCarregadas.length, 'imagens');
    debugArrays();
    
    processandoPDF = true;
    console.log('Iniciando geração de PDF');
    
    // Mostrar seção de progresso
    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('progressSection').scrollIntoView({ behavior: 'smooth' });
    
    // Compilar PDF
    setTimeout(() => {
        compilarPDF(imagensCarregadas, configuracoes);
    }, 500);
}

// Função para confirmar configurações antes de gerar PDF
function confirmarConfiguracoes(config) {
    const dataHora = new Date().toISOString().split('T')[0];
    const nomeArquivo = `${config.nomeArquivo}_${dataHora}.pdf`;
    
    // Usar traduções se disponíveis
    const t = window.t || ((key, params = {}) => {
        // Fallback para português se sistema de tradução não estiver disponível
        const fallbacks = {
            configTitle: '📋 CONFIGURAÇÕES DO PDF:',
            configTitleField: '📄 Título:',
            configAuthorField: '👤 Elaborado por:',
            configFilenameField: '📁 Nome do arquivo:',
            configImagesField: '🖼️ Imagens:',
            configImagesCount: '{count} imagem(ns)',
            configImagesPerPage: '📑 Imagens por página: {count}',
            configNumberPages: '✅ Numerar páginas',
            configNoNumberPages: '❌ Numerar páginas',
            configDateField: '📅 Data:',
            configContinue: 'Deseja continuar?'
        };
        let result = fallbacks[key] || key;
        Object.keys(params).forEach(param => {
            result = result.replace(`{${param}}`, params[param]);
        });
        return result;
    });
    
    let mensagemData = '';
    if (config.dataRodape) {
        mensagemData = `\n${t('configDateField')} "${config.dataRodape}"`;
    }
    
    const mensagem = `
${t('configTitle')}

${t('configTitleField')} "${config.titulo}"
${t('configAuthorField')} "${config.autor}"
${t('configFilenameField')} "${nomeArquivo}"

${t('configImagesField')} ${t('configImagesCount', {count: imagensCarregadas.length})}
${t('configImagesPerPage', {count: config.imagensPorPagina})}
${config.numerarPaginas ? t('configNumberPages') : t('configNoNumberPages')}${mensagemData}

${t('configContinue')}`;
    
    return confirm(mensagem);
}

// Obter configurações do usuário
function obterConfiguracoes() {
    const tituloElement = document.getElementById('titulo');
    const autorElement = document.getElementById('autor');
    const nomeArquivoElement = document.getElementById('nomeArquivo');
    const numerarPaginasElement = document.getElementById('numerarPaginas');
    const imagensPorPaginaElement = document.getElementById('imagensPorPagina');
    const dataRodapeElement = document.getElementById('dataRodape');
    const incluirDataElement = document.getElementById('incluirData');
    
    const titulo = tituloElement ? tituloElement.value.trim() : '';
    const autor = autorElement ? autorElement.value.trim() : '';
    const nomeArquivo = nomeArquivoElement ? nomeArquivoElement.value.trim() : '';
    const numerarPaginas = numerarPaginasElement ? numerarPaginasElement.checked : true;
    const imagensPorPagina = imagensPorPaginaElement ? parseInt(imagensPorPaginaElement.value) : 1;
    const incluirData = incluirDataElement ? incluirDataElement.checked : false;
    
    // Obter data do campo (formato YYYY-MM-DD) e converter para DD/MM/YYYY
    // Só processa se o checkbox estiver marcado
    let dataRodape = '';
    if (incluirData && dataRodapeElement && dataRodapeElement.value) {
        const dataParts = dataRodapeElement.value.split('-');
        if (dataParts.length === 3) {
            dataRodape = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;
        }
    }
    
    return {
        // Configurações fixas (valores padrão)
        qualidade: 0.95,
        orientacao: 'portrait',
        tamanho: 'a4',
        margens: 10,
        adicionarMarca: false,
        
        // Configurações do usuário
        numerarPaginas: numerarPaginas,
        imagensPorPagina: imagensPorPagina,
        dataRodape: dataRodape,
        titulo: titulo || 'Documento PDF',
        autor: autor || 'HFileEasy',
        nomeArquivo: nomeArquivo || 'documento'
    };
}

// Compilar PDF usando jsPDF
function compilarPDF(imagens, configuracoes) {
    console.log('Compilando PDF com configurações:', configuracoes);
    
    try {
        const { jsPDF } = window.jspdf;
        
        // Determinar orientação e tamanho
        const orientacao = configuracoes.orientacao === 'auto' ? 'portrait' : configuracoes.orientacao;
        const doc = new jsPDF({
            orientation: orientacao,
            unit: 'mm',
            format: configuracoes.tamanho
        });
        
        // Configurar propriedades do documento
        doc.setProperties({
            title: configuracoes.titulo,
            author: configuracoes.autor,
            creator: 'HFileEasy',
            producer: 'HFileEasy'
        });
        
        // Obter dimensões da página
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margens = configuracoes.margens;
        
        // =============================================
        // PROCESSAR IMAGENS
        // =============================================
        const imagensPorPagina = configuracoes.imagensPorPagina;
        let paginaAtual = 0;
        let imagensNaPagina = 0;
        let primeiraPagina = true;
        
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            
            const progressText = window.t ? window.t('processingImage', {current: i + 1, total: imagens.length}) : `Processando imagem ${i + 1} de ${imagens.length}`;
            atualizarProgresso((i / imagens.length) * 100, progressText);
            
            // Validar se a imagem tem todas as propriedades necessárias
            if (!imagem || !imagem.dataUrl || !imagem.largura || !imagem.altura) {
                console.error('Imagem inválida para PDF no índice:', i, imagem);
                continue;
            }
            
            // Verificar se precisa de nova página
            if (imagensNaPagina >= imagensPorPagina) {
                doc.addPage();
                paginaAtual++;
                imagensNaPagina = 0;
                primeiraPagina = false;
            }
            
            // =============================================
            // TÍTULO APENAS NA PRIMEIRA PÁGINA
            // =============================================
            let espacoTopo = 20; // Espaço padrão
            
            if (primeiraPagina && imagensNaPagina === 0) {
                doc.setFontSize(20);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                
                // Calcular posição e quebrar linha se necessário
                const titulo = configuracoes.titulo;
                const maxTituloWidth = pageWidth - 40;
                const linhas = doc.splitTextToSize(titulo, maxTituloWidth);
                
                // Calcular posição Y para o título
                const alturaLinha = 7;
                let yAtual = 25;
                
                // Adicionar cada linha do título
                linhas.forEach((linha) => {
                    const linhaWidth = doc.getTextWidth(linha);
                    const linhaX = (pageWidth - linhaWidth) / 2;
                    doc.text(linha, linhaX, yAtual);
                    yAtual += alturaLinha;
                });
                
                // Adicionar linha decorativa abaixo do título
                doc.setDrawColor(102, 126, 234);
                doc.setLineWidth(1);
                const linhaPosY = yAtual + 3;
                doc.line(20, linhaPosY, pageWidth - 20, linhaPosY);
                
                // Calcular espaço usado pelo título
                const alturaTotal = linhas.length * alturaLinha;
                espacoTopo = 25 + alturaTotal + 15;
            }
            
            // =============================================
            // CALCULAR POSIÇÃO DA IMAGEM
            // =============================================
            const areaDisponivel = pageHeight - espacoTopo - 30; // Espaço para rodapé
            let alturaImagem, yImagem;
            
            if (imagensPorPagina === 1) {
                // 1 imagem por página - usa toda a área disponível
                alturaImagem = areaDisponivel;
                yImagem = espacoTopo;
            } else {
                // 2 imagens por página - divide a área em duas
                alturaImagem = (areaDisponivel - 20) / 2; // 20px de espaço entre imagens
                yImagem = espacoTopo + (imagensNaPagina * (alturaImagem + 20));
            }
            
            // Calcular dimensões mantendo proporção
            const maxImageWidth = pageWidth - (margens * 2);
            const imgRatio = imagem.largura / imagem.altura;
            const maxRatio = maxImageWidth / alturaImagem;
            
            let imgWidth, imgHeight;
            
            if (imgRatio > maxRatio) {
                imgWidth = maxImageWidth;
                imgHeight = maxImageWidth / imgRatio;
            } else {
                imgHeight = alturaImagem;
                imgWidth = alturaImagem * imgRatio;
            }
            
            // Centralizar horizontalmente
            const xImagem = (pageWidth - imgWidth) / 2;
            
            // Centralizar verticalmente na área designada
            const yFinal = yImagem + (alturaImagem - imgHeight) / 2;
            
            // Adicionar imagem ao PDF
            doc.addImage(imagem.dataUrl, 'JPEG', xImagem, yFinal, imgWidth, imgHeight);
            
            // Adicionar marca d'água se habilitado
            if (configuracoes.adicionarMarca) {
                adicionarMarcaDAgua(doc, pageWidth, pageHeight);
            }
            
            imagensNaPagina++;
            
            // =============================================
            // RODAPÉ (só adicionar na última imagem da página)
            // =============================================
            if (imagensNaPagina >= imagensPorPagina || i === imagens.length - 1) {
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(128, 128, 128);
                
                // "Elaborado por" no lado esquerdo
                const autorRodape = `Elaborado por: ${configuracoes.autor}`;
                doc.text(autorRodape, 20, pageHeight - 10);
                
                // Texto do lado direito: numeração e/ou data
                let textoDireita = '';
                
                // Numeração no lado direito (se habilitada)
                if (configuracoes.numerarPaginas) {
                    textoDireita = `Página ${paginaAtual + 1}`;
                }
                
                // Adicionar data ao lado da numeração (se fornecida)
                if (configuracoes.dataRodape) {
                    if (textoDireita) {
                        // Se tem numeração, adicionar data ao lado
                        textoDireita = `${textoDireita} | ${configuracoes.dataRodape}`;
                    } else {
                        // Se não tem numeração, apenas a data
                        textoDireita = configuracoes.dataRodape;
                    }
                }
                
                // Adicionar texto do lado direito (numeração e/ou data)
                if (textoDireita) {
                    const textoWidth = doc.getTextWidth(textoDireita);
                    doc.text(textoDireita, pageWidth - textoWidth - 20, pageHeight - 10);
                }
            }
        }
        
        // =============================================
        // 4. FINALIZAR E SALVAR COM NOME PERSONALIZADO
        // =============================================
        const finalizingText = window.t ? window.t('progressFinalizing') : 'Finalizando PDF...';
        atualizarProgresso(100, finalizingText);
        
        setTimeout(() => {
            // Gerar nome do arquivo baseado na configuração do usuário
            const nomeBase = configuracoes.nomeArquivo.replace(/[^a-zA-Z0-9_\-]/g, '_');
            const dataHora = new Date().toISOString().split('T')[0];
            const nomeArquivo = `${nomeBase}_${dataHora}.pdf`;
            
            // Salvar o arquivo
            doc.save(nomeArquivo);
            
            // Mostrar modal de sucesso
            mostrarModalSucesso();
            
            // Resetar estado
            processandoPDF = false;
            document.getElementById('progressSection').style.display = 'none';
            
            console.log('PDF gerado com sucesso:', nomeArquivo);
            console.log('Configurações utilizadas:', configuracoes);
        }, 1000);
        
    } catch (erro) {
        console.error('Erro ao gerar PDF:', erro);
        alert('❌ Erro ao gerar PDF. Verifique o console para mais detalhes.');
        
        // Mostrar detalhes do erro no console
        console.error('Detalhes do erro:');
        console.error('- Configurações:', configuracoes);
        console.error('- Número de imagens:', imagens.length);
        console.error('- Erro completo:', erro);
        
        // Sugestões de solução
        console.log('💡 Sugestões para resolver o erro:');
        console.log('1. Verifique se todas as imagens foram carregadas corretamente');
        console.log('2. Tente reduzir a qualidade das imagens');
        console.log('3. Verifique se o nome do arquivo não contém caracteres especiais');
        console.log('4. Tente gerar o PDF com menos imagens');
        
        processandoPDF = false;
        document.getElementById('progressSection').style.display = 'none';
    }
}

// Adicionar marca d'água
function adicionarMarcaDAgua(doc, pageWidth, pageHeight) {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.setFontSize(60);
    doc.setTextColor(128, 128, 128);
    
    // Rotacionar e posicionar texto
    const texto = 'HFileEasy';
    const textWidth = doc.getTextWidth(texto);
    
    doc.text(texto, pageWidth / 2 - textWidth / 2, pageHeight / 2, {
        angle: 45
    });
    
    doc.restoreGraphicsState();
}

// Atualizar barra de progresso
function atualizarProgresso(porcentagem, texto) {
    document.getElementById('progressFill').style.width = `${porcentagem}%`;
    document.getElementById('progressText').textContent = texto;
}

// Mostrar/esconder loading
function mostrarLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function esconderLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Modal de sucesso
function mostrarModalSucesso() {
    document.getElementById('successModal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        if (e.target.id === 'editModal') {
            fecharModalEdicao();
        } else {
            fecharModal();
        }
    }
});

// Funções removidas: atualizarQualidade() e atualizarMargens()
// A interface foi simplificada para usar apenas valores padrão

// Função utilitária para formatar tamanho de arquivo
function formatarTamanho(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Função para debug - mostrar no console
function debug(message, data = null) {
    console.log(`[HFileEasy] ${message}`, data || '');
}

// Função para debug detalhado dos arrays
function debugArrays() {
    console.group('Debug Arrays de Imagens');
    console.log('imagensCarregadas:', imagensCarregadas.length, imagensCarregadas);
    console.log('ordemOriginal:', ordemOriginal.length, ordemOriginal);
    
    // Verificar integridade dos objetos
    imagensCarregadas.forEach((img, index) => {
        if (!img || !img.id || !img.dataUrl || !img.largura || !img.altura) {
            console.warn(`Imagem inválida no índice ${index}:`, img);
        }
    });
    
    console.groupEnd();
}

// Variáveis para drag and drop
let itemArrastado = null;
let indexOrigem = null;

// Variáveis para edição de imagens
let imagemSendoEditada = null;
let canvasEditor = null;
let ctxEditor = null;
let imagemOriginal = null;
let rotacaoAtual = 0;
let modoCorte = false;
let areaCorte = null;

// Handlers para drag and drop das imagens
function handleDragStart(e) {
    itemArrastado = e.target;
    indexOrigem = parseInt(e.target.dataset.index);
    
    // Validar se o índice é válido
    if (isNaN(indexOrigem) || indexOrigem < 0 || indexOrigem >= imagensCarregadas.length) {
        console.error('Índice inválido para drag:', indexOrigem);
        return;
    }
    
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    
    const imagem = imagensCarregadas[indexOrigem];
    debug('Iniciando drag', { index: indexOrigem, nome: imagem ? imagem.nome : 'Imagem sem nome' });
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // Remover classe drag-over de todos os itens
    document.querySelectorAll('.preview-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    itemArrastado = null;
    indexOrigem = null;
    
    debug('Finalizando drag');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    let targetItem = e.target;
    while (targetItem && !targetItem.classList.contains('preview-item')) {
        targetItem = targetItem.parentElement;
    }
    
    if (targetItem && targetItem !== itemArrastado) {
        targetItem.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    let targetItem = e.target;
    while (targetItem && !targetItem.classList.contains('preview-item')) {
        targetItem = targetItem.parentElement;
    }
    
    if (targetItem) {
        targetItem.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    // Encontrar o item preview mais próximo
    let targetItem = e.target;
    while (targetItem && !targetItem.classList.contains('preview-item')) {
        targetItem = targetItem.parentElement;
    }
    
    if (targetItem && targetItem !== itemArrastado && targetItem.dataset.index) {
        const indexDestino = parseInt(targetItem.dataset.index);
        
        // Validar índices antes de reordenar
        if (indexOrigem !== null && !isNaN(indexDestino) && 
            indexOrigem >= 0 && indexOrigem < imagensCarregadas.length &&
            indexDestino >= 0 && indexDestino < imagensCarregadas.length &&
            indexOrigem !== indexDestino) {
            
            // Reordenar array de imagens
            const imagemMovida = imagensCarregadas[indexOrigem];
            if (imagemMovida) {
                imagensCarregadas.splice(indexOrigem, 1);
                imagensCarregadas.splice(indexDestino, 0, imagemMovida);
                
                debug('Reordenando imagens', { origem: indexOrigem, destino: indexDestino });
                
                // Mostrar feedback visual
                mostrarFeedback('Ordem das imagens atualizada!');
                
                // Atualizar preview
                atualizarPreview();
            } else {
                console.error('Imagem não encontrada no índice:', indexOrigem);
            }
        }
    }
    
    return false;
}

// Inicializar debug
debug('Aplicação inicializada com sucesso');

// Service Worker para funcionamento offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                debug('Service Worker registrado com sucesso');
            })
            .catch(function(error) {
                debug('Falha ao registrar Service Worker', error);
            });
    });
}

// Prevenir comportamento padrão de drag and drop na página
document.addEventListener('dragover', function(e) {
    e.preventDefault();
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
});

// Função para testar se todas as dependências estão carregadas
function testarDependencias() {
    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF não foi carregado corretamente');
        const message = window.t ? window.t('jsPDFError') : 'Erro: Biblioteca jsPDF não carregada. Verifique sua conexão com a internet.';
        alert(message);
        return false;
    }
    
    const message = window.t ? window.t('dependenciesLoaded') : 'Todas as dependências carregadas com sucesso';
    debug(message);
    return true;
}

// Testar dependências quando a página carregar
window.addEventListener('load', function() {
    setTimeout(testarDependencias, 1000);
});

// Função para baixar exemplo de imagem de teste (opcional)
function baixarImagemTeste() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Criar imagem de teste
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Adicionar texto de teste
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.font = '20px Arial';
    ctx.fillText('HFileEasy', 400, 300);
    
    // Converter para blob e fazer download
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'teste-hfileeasy.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Adicionar atalhos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + O para abrir arquivos
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        document.getElementById('fileInput').click();
    }
    
    // Ctrl/Cmd + G para gerar PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        if (imagensCarregadas.length > 0) {
            gerarPDF();
        }
    }
    
    // Esc para fechar modal
    if (e.key === 'Escape') {
        fecharModal();
    }
    
    // Ctrl/Cmd + D para debug (em desenvolvimento)
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        debugArrays();
    }
});

// Função para validar e limpar arrays de imagens
function validarImagensCarregadas() {
    // Filtrar imagens inválidas
    imagensCarregadas = imagensCarregadas.filter(img => 
        img && 
        img.id !== undefined && 
        img.dataUrl && 
        img.nome && 
        img.largura > 0 && 
        img.altura > 0
    );
    
    ordemOriginal = ordemOriginal.filter(img => 
        img && 
        img.id !== undefined && 
        img.dataUrl && 
        img.nome && 
        img.largura > 0 && 
        img.altura > 0
    );
    
    debug('Arrays de imagens validados', { 
        carregadas: imagensCarregadas.length, 
        originais: ordemOriginal.length 
    });
}

debug('Script carregado completamente');

// ========== FUNÇÕES DE EDIÇÃO DE IMAGENS ==========

// Abrir modal de edição
function editarImagem(id) {
    const imagem = imagensCarregadas.find(img => img && img.id && img.id.toString() === id);
    if (!imagem || !imagem.dataUrl) {
        console.error('Imagem não encontrada para edição:', id);
        mostrarFeedback('Erro: Imagem não encontrada');
        return;
    }
    
    // Garantir que todas as propriedades existem
    imagemSendoEditada = {
        ...imagem,
        nome: imagem.nome || 'Imagem sem nome',
        largura: imagem.largura || 800,
        altura: imagem.altura || 600
    };
    
    // Configurar canvas
    canvasEditor = document.getElementById('editCanvas');
    ctxEditor = canvasEditor.getContext('2d');
    
    // Resetar valores
    rotacaoAtual = 0;
    modoCorte = false;
    areaCorte = null;
    
    // Carregar imagem original
    carregarImagemNoEditor(imagem);
    
    // Mostrar modal
    document.getElementById('editModal').style.display = 'flex';
    
    debug('Modal de edição aberto para:', imagem.nome);
}

// Fechar modal de edição
function fecharModalEdicao() {
    document.getElementById('editModal').style.display = 'none';
    
    // Limpar variáveis
    imagemSendoEditada = null;
    canvasEditor = null;
    ctxEditor = null;
    imagemOriginal = null;
    rotacaoAtual = 0;
    modoCorte = false;
    areaCorte = null;
    
    debug('Modal de edição fechado');
}

// Carregar imagem no editor
function carregarImagemNoEditor(imagem) {
    const img = new Image();
    img.onload = function() {
        imagemOriginal = img;
        
        // Ajustar tamanho do canvas
        const maxWidth = 500;
        const maxHeight = 400;
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
        
        canvasEditor.width = img.width * scale;
        canvasEditor.height = img.height * scale;
        
        // Desenhar imagem
        desenharImagem();
    };
    img.src = imagem.dataUrl;
}

// Desenhar imagem no canvas
function desenharImagem() {
    if (!imagemOriginal || !ctxEditor) return;
    
    // Limpar canvas
    ctxEditor.clearRect(0, 0, canvasEditor.width, canvasEditor.height);
    
    // Salvar contexto
    ctxEditor.save();
    
    // Aplicar rotação
    if (rotacaoAtual !== 0) {
        ctxEditor.translate(canvasEditor.width / 2, canvasEditor.height / 2);
        ctxEditor.rotate(rotacaoAtual * Math.PI / 180);
        ctxEditor.translate(-canvasEditor.width / 2, -canvasEditor.height / 2);
    }
    
    // Desenhar imagem
    ctxEditor.drawImage(imagemOriginal, 0, 0, canvasEditor.width, canvasEditor.height);
    
    // Restaurar contexto
    ctxEditor.restore();
    
    // Desenhar área de corte se ativa
    if (modoCorte && areaCorte) {
        desenharAreaCorte();
    }
}

// Girar imagem
function girarImagem(graus) {
    rotacaoAtual += graus;
    rotacaoAtual = rotacaoAtual % 360;
    
    // Recalcular dimensões do canvas baseado na rotação
    if (imagemOriginal && (graus === 90 || graus === -90)) {
        const maxWidth = 500;
        const maxHeight = 400;
        
        // Para rotações de 90° e -90°, trocar largura e altura da imagem original
        const imgWidth = imagemOriginal.height;
        const imgHeight = imagemOriginal.width;
        
        // Calcular escala mantendo proporção
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
        
        canvasEditor.width = imgWidth * scale;
        canvasEditor.height = imgHeight * scale;
        
        debug('Canvas redimensionado para rotação:', { 
            width: canvasEditor.width, 
            height: canvasEditor.height,
            rotacao: rotacaoAtual
        });
    }
    
    desenharImagem();
    mostrarFeedback(`Imagem girada ${graus > 0 ? 'direita' : 'esquerda'} ${Math.abs(graus)}°`);
}



// Ativar modo de corte
function ativarCorte() {
    modoCorte = !modoCorte;
    const btnCorte = document.querySelector('button[onclick="ativarCorte()"]');
    
    if (modoCorte) {
        btnCorte.classList.add('active');
        btnCorte.textContent = 'Cancelar Corte';
        
        // Definir área de corte padrão
        areaCorte = {
            x: canvasEditor.width * 0.1,
            y: canvasEditor.height * 0.1,
            width: canvasEditor.width * 0.8,
            height: canvasEditor.height * 0.8
        };
        
        // Adicionar eventos de mouse e touch para ajustar corte
        canvasEditor.addEventListener('mousedown', iniciarCorte);
        canvasEditor.addEventListener('mousemove', ajustarCorte);
        canvasEditor.addEventListener('mouseup', finalizarCorte);
        canvasEditor.addEventListener('touchstart', iniciarCorteTouch);
        canvasEditor.addEventListener('touchmove', ajustarCorteTouch);
        canvasEditor.addEventListener('touchend', finalizarCorte);
        
        mostrarFeedback('Modo de corte ativado - Clique e arraste para definir área');
    } else {
        btnCorte.classList.remove('active');
        btnCorte.textContent = 'Cortar';
        areaCorte = null;
        
        // Remover eventos
        canvasEditor.removeEventListener('mousedown', iniciarCorte);
        canvasEditor.removeEventListener('mousemove', ajustarCorte);
        canvasEditor.removeEventListener('mouseup', finalizarCorte);
        canvasEditor.removeEventListener('touchstart', iniciarCorteTouch);
        canvasEditor.removeEventListener('touchmove', ajustarCorteTouch);
        canvasEditor.removeEventListener('touchend', finalizarCorte);
        
        mostrarFeedback('Modo de corte desativado');
    }
    
    desenharImagem();
}

// Redefinir corte
function redefinirCorte() {
    areaCorte = null;
    modoCorte = false;
    
    const btnCorte = document.querySelector('button[onclick="ativarCorte()"]');
    btnCorte.classList.remove('active');
    btnCorte.textContent = 'Cortar';
    
    desenharImagem();
    mostrarFeedback('Área de corte redefinida');
}

// Desenhar área de corte
function desenharAreaCorte() {
    if (!areaCorte) return;
    
    ctxEditor.save();
    ctxEditor.strokeStyle = '#667eea';
    ctxEditor.lineWidth = 2;
    ctxEditor.setLineDash([5, 5]);
    ctxEditor.strokeRect(areaCorte.x, areaCorte.y, areaCorte.width, areaCorte.height);
    ctxEditor.restore();
}

// Variáveis para controle do corte
let cortando = false;
let inicioCorte = { x: 0, y: 0 };

// Iniciar corte
function iniciarCorte(e) {
    if (!modoCorte) return;
    
    cortando = true;
    const rect = canvasEditor.getBoundingClientRect();
    inicioCorte = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Ajustar corte
function ajustarCorte(e) {
    if (!cortando || !modoCorte) return;
    
    const rect = canvasEditor.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    areaCorte = {
        x: Math.min(inicioCorte.x, x),
        y: Math.min(inicioCorte.y, y),
        width: Math.abs(x - inicioCorte.x),
        height: Math.abs(y - inicioCorte.y)
    };
    
    desenharImagem();
}

// Finalizar corte
function finalizarCorte() {
    cortando = false;
}

// Salvar edição
function salvarEdicao() {
    if (!imagemSendoEditada || !canvasEditor || !imagemOriginal) {
        console.error('Dados de edição inválidos:', { imagemSendoEditada, canvasEditor, imagemOriginal });
        mostrarFeedback('Erro: Dados de edição inválidos');
        fecharModalEdicao();
        return;
    }
    
    // Verificar se imagemSendoEditada tem todas as propriedades necessárias
    if (!imagemSendoEditada.id || !imagemSendoEditada.dataUrl) {
        console.error('Imagem sendo editada tem propriedades inválidas:', imagemSendoEditada);
        mostrarFeedback('Erro: Imagem inválida');
        fecharModalEdicao();
        return;
    }
    
    // Preservar referência para evitar problemas de null
    const imagemRef = imagemSendoEditada;
    const nomeImagem = imagemRef.nome || 'Imagem sem nome';
    
    try {
        debug('Iniciando salvamento de edição para:', nomeImagem);
        debug('Rotação atual:', rotacaoAtual);
        debug('Área de corte:', areaCorte);
        debug('Dimensões canvas:', { width: canvasEditor.width, height: canvasEditor.height });
        debug('Dimensões imagem original:', { width: imagemOriginal.width, height: imagemOriginal.height });
        
        // Criar canvas temporário para salvar
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Calcular escala entre canvas e imagem original
        const scaleX = imagemOriginal.width / canvasEditor.width;
        const scaleY = imagemOriginal.height / canvasEditor.height;
        
        debug('Escalas calculadas:', { scaleX, scaleY });
        
        // Determinar dimensões finais considerando rotação
        let finalWidth = imagemOriginal.width;
        let finalHeight = imagemOriginal.height;
        
        // Ajustar dimensões para rotações de 90° e 270°
        if (rotacaoAtual === 90 || rotacaoAtual === 270) {
            finalWidth = imagemOriginal.height;
            finalHeight = imagemOriginal.width;
        }
        
        // Área de corte em coordenadas da imagem original
        let areaCorteReal = null;
        
        if (areaCorte) {
            // Converter coordenadas do canvas para coordenadas da imagem original
            areaCorteReal = {
                x: Math.max(0, Math.floor(areaCorte.x * scaleX)),
                y: Math.max(0, Math.floor(areaCorte.y * scaleY)),
                width: Math.min(imagemOriginal.width, Math.ceil(areaCorte.width * scaleX)),
                height: Math.min(imagemOriginal.height, Math.ceil(areaCorte.height * scaleY))
            };
            
            // Garantir que as dimensões não excedam os limites da imagem
            if (areaCorteReal.x + areaCorteReal.width > imagemOriginal.width) {
                areaCorteReal.width = imagemOriginal.width - areaCorteReal.x;
            }
            if (areaCorteReal.y + areaCorteReal.height > imagemOriginal.height) {
                areaCorteReal.height = imagemOriginal.height - areaCorteReal.y;
            }
            
            // Se há rotação, recalcular dimensões finais do corte
            if (rotacaoAtual === 90 || rotacaoAtual === 270) {
                finalWidth = areaCorteReal.height;
                finalHeight = areaCorteReal.width;
            } else {
                finalWidth = areaCorteReal.width;
                finalHeight = areaCorteReal.height;
            }
            
            debug('Área de corte convertida:', areaCorteReal);
        }
        
        tempCanvas.width = finalWidth;
        tempCanvas.height = finalHeight;
        
        // Aplicar todas as transformações
        tempCtx.save();
        
        // Aplicar rotação se necessário
        if (rotacaoAtual !== 0) {
            tempCtx.translate(finalWidth / 2, finalHeight / 2);
            tempCtx.rotate(rotacaoAtual * Math.PI / 180);
            
            // Ajustar posição baseada na rotação
            if (rotacaoAtual === 90 || rotacaoAtual === 270) {
                tempCtx.translate(-finalHeight / 2, -finalWidth / 2);
            } else {
                tempCtx.translate(-finalWidth / 2, -finalHeight / 2);
            }
        }
        
        // Desenhar imagem (cortada se necessário)
        if (areaCorteReal) {
            tempCtx.drawImage(
                imagemOriginal,
                areaCorteReal.x, areaCorteReal.y, areaCorteReal.width, areaCorteReal.height,
                0, 0, areaCorteReal.width, areaCorteReal.height
            );
        } else {
            tempCtx.drawImage(imagemOriginal, 0, 0, imagemOriginal.width, imagemOriginal.height);
        }
        
        tempCtx.restore();
        
        // Converter para dataURL
        const novoDataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
        
        // Encontrar e atualizar imagem na lista
        const indexImagem = imagensCarregadas.findIndex(img => img && img.id === imagemRef.id);
        if (indexImagem === -1) {
            throw new Error('Imagem não encontrada no array para atualização');
        }
        
        // Atualizar imagem na lista
        imagensCarregadas[indexImagem] = {
            ...imagensCarregadas[indexImagem],
            dataUrl: novoDataUrl,
            canvas: tempCanvas,
            largura: finalWidth,
            altura: finalHeight
        };
        
        debug('Imagem atualizada no índice:', indexImagem);
        
        // Atualizar preview
        atualizarPreview();
        
        // Fechar modal
        fecharModalEdicao();
        
        // Feedback detalhado
        let feedback = 'Imagem editada com sucesso!';
        if (rotacaoAtual !== 0) {
            feedback += ` (Rotação: ${rotacaoAtual}°)`;
        }
        if (areaCorteReal) {
            feedback += ' (Cortada)';
        }
        
        mostrarFeedback(feedback);
        debug('Edição salva para:', nomeImagem);
        
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
        mostrarFeedback('Erro ao salvar edição: ' + error.message);
    }
}

// Funções de touch para corte
function iniciarCorteTouch(e) {
    e.preventDefault();
    if (!modoCorte) return;
    
    cortando = true;
    const rect = canvasEditor.getBoundingClientRect();
    const touch = e.touches[0];
    inicioCorte = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

function ajustarCorteTouch(e) {
    e.preventDefault();
    if (!cortando || !modoCorte) return;
    
    const rect = canvasEditor.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    areaCorte = {
        x: Math.min(inicioCorte.x, x),
        y: Math.min(inicioCorte.y, y),
        width: Math.abs(x - inicioCorte.x),
        height: Math.abs(y - inicioCorte.y)
    };
    
    desenharImagem();
} 

// Funções para reordenar imagens no mobile
function moverImagemPara(id, direcao) {
    const index = imagensCarregadas.findIndex(img => img && img.id && img.id.toString() === id);
    
    if (index === -1) {
        console.error('Imagem não encontrada:', id);
        return;
    }
    
    const novoIndex = index + direcao;
    
    if (novoIndex < 0 || novoIndex >= imagensCarregadas.length) {
        return;
    }
    
    // Mover imagem na lista
    const imagemMovida = imagensCarregadas[index];
    imagensCarregadas.splice(index, 1);
    imagensCarregadas.splice(novoIndex, 0, imagemMovida);
    
    // Atualizar preview
    atualizarPreview();
    
    // Mostrar feedback
    mostrarFeedback(`Imagem movida para posição ${novoIndex + 1}!`);
    
    // Vibrar se disponível
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function selecionarPosicaoImagem(id) {
    const index = imagensCarregadas.findIndex(img => img && img.id && img.id.toString() === id);
    
    if (index === -1) {
        console.error('Imagem não encontrada:', id);
        return;
    }
    
    const imagem = imagensCarregadas[index];
    const nome = imagem.nome || `Imagem ${index + 1}`;
    
    // Criar modal de seleção de posição
    mostrarModalSelecaoPosicao(id, nome, index);
}

function mostrarModalSelecaoPosicao(id, nomeImagem, indexAtual) {
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.zIndex = '10000';
    
    // Gerar ID único para o modal
    const modalId = 'positionModal' + Date.now();
    modal.id = modalId;
    
    // Criar lista de opções
    let opcoes = '';
    for (let i = 0; i < imagensCarregadas.length; i++) {
        const currentImg = imagensCarregadas[i];
        const currentNome = currentImg.nome || `Imagem ${i + 1}`;
        const isAtual = i === indexAtual;
        opcoes += `
            <div class="position-option ${isAtual ? 'current' : ''}" onclick="moverParaPosicao('${id}', ${i}, '${modalId}', event)">
                <div class="position-number">${i + 1}</div>
                <div class="position-name">${currentNome}</div>
                ${isAtual ? '<div class="position-current">Atual</div>' : ''}
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-content position-modal">
            <div class="modal-header">
                <h3>📍 Escolher Posição</h3>
                <button class="modal-close" onclick="fecharModalPosicao('${modalId}')">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Imagem:</strong> ${nomeImagem}</p>
                <p>Selecione a nova posição:</p>
                <div class="position-options">
                    ${opcoes}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="fecharModalPosicao('${modalId}')">Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Vibrar se disponível
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function moverParaPosicao(id, novaPosicao, modalId, event) {
    console.log('Movendo imagem para posição:', { id, novaPosicao, modalId });
    
    // Dar feedback visual imediato
    if (event && event.target) {
        const option = event.target.closest('.position-option');
        if (option) {
            option.style.background = '#4CAF50';
            option.style.color = 'white';
            option.style.transform = 'scale(0.95)';
        }
    }
    
    const index = imagensCarregadas.findIndex(img => img && img.id && img.id.toString() === id);
    
    if (index === -1) {
        console.error('Imagem não encontrada:', id);
        fecharModalPosicao(modalId);
        return;
    }
    
    if (novaPosicao === index) {
        mostrarFeedback('✅ Imagem já está na posição selecionada!');
        fecharModalPosicao(modalId);
        return;
    }
    
    // Mover imagem para nova posição
    const imagem = imagensCarregadas[index];
    imagensCarregadas.splice(index, 1);
    imagensCarregadas.splice(novaPosicao, 0, imagem);
    
    // Fechar modal primeiro (com pequeno delay para ver o feedback visual)
    setTimeout(() => {
        fecharModalPosicao(modalId);
    }, 150);
    
    // Atualizar preview
    atualizarPreview();
    
    // Mostrar feedback
    mostrarFeedback(`📍 Imagem movida para posição ${novaPosicao + 1}!`);
    
    // Vibrar se disponível
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    console.log('Imagem movida com sucesso!');
}

function fecharModalPosicao(modalId) {
    console.log('Fechando modal:', modalId);
    
    // Tentar remover o modal por ID
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
        console.log('Modal removido por ID');
        return;
    }
    
    // Se não encontrou por ID, tentar remover todos os modais de posição
    const modals = document.querySelectorAll('.modal');
    modals.forEach(m => {
        if (m.querySelector('.position-modal')) {
            m.remove();
            console.log('Modal removido por seletor');
        }
    });
}

// Variáveis para controle de touch
let touchStarted = false;
let touchStartX = 0;
let touchStartY = 0;
let touchItem = null;
let touchStartIndex = null;
let touchMoveThreshold = 10;
let touchTimer = null;

// Função para touch start (mobile)
function handleTouchStart(e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStarted = false;
    touchItem = e.currentTarget;
    touchStartIndex = parseInt(touchItem.dataset.index);
    
    // Timer para detectar long press
    touchTimer = setTimeout(() => {
        if (!touchStarted) {
            touchStarted = true;
            touchItem.classList.add('dragging');
            touchItem.style.zIndex = '1000';
            touchItem.style.transform = 'scale(1.05)';
            
            // Vibrar se disponível
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            debug('Touch drag iniciado', { index: touchStartIndex });
        }
    }, 200);
}

// Função para touch move (mobile)
function handleTouchMove(e) {
    if (!touchStarted) {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);
        
        // Se moveu muito, cancela o timer
        if (deltaX > touchMoveThreshold || deltaY > touchMoveThreshold) {
            clearTimeout(touchTimer);
        }
        return;
    }
    
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    
    // Mover o item visualmente
    touchItem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    
    // Encontrar item sobre o qual está passando
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    let targetItem = elementBelow;
    
    // Subir na hierarquia até encontrar um preview-item
    while (targetItem && !targetItem.classList.contains('preview-item')) {
        targetItem = targetItem.parentElement;
    }
    
    // Remover drag-over de todos os itens
    document.querySelectorAll('.preview-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    // Adicionar drag-over ao item alvo
    if (targetItem && targetItem !== touchItem) {
        targetItem.classList.add('drag-over');
    }
}

// Função para touch end (mobile)
function handleTouchEnd(e) {
    clearTimeout(touchTimer);
    
    if (!touchStarted) {
        return;
    }
    
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    let targetItem = elementBelow;
    
    // Subir na hierarquia até encontrar um preview-item
    while (targetItem && !targetItem.classList.contains('preview-item')) {
        targetItem = targetItem.parentElement;
    }
    
    // Resetar estilos
    touchItem.classList.remove('dragging');
    touchItem.style.zIndex = '';
    touchItem.style.transform = '';
    
    // Remover drag-over de todos os itens
    document.querySelectorAll('.preview-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    // Executar reordenação se necessário
    if (targetItem && targetItem !== touchItem && targetItem.dataset.index) {
        const indexDestino = parseInt(targetItem.dataset.index);
        
        if (touchStartIndex !== null && !isNaN(indexDestino) && 
            touchStartIndex >= 0 && touchStartIndex < imagensCarregadas.length &&
            indexDestino >= 0 && indexDestino < imagensCarregadas.length &&
            touchStartIndex !== indexDestino) {
            
            // Reordenar array de imagens
            const imagemMovida = imagensCarregadas[touchStartIndex];
            if (imagemMovida) {
                imagensCarregadas.splice(touchStartIndex, 1);
                imagensCarregadas.splice(indexDestino, 0, imagemMovida);
                
                debug('Reordenando imagens via touch', { origem: touchStartIndex, destino: indexDestino });
                
                // Mostrar feedback visual
                mostrarFeedback('Ordem das imagens atualizada!');
                
                // Atualizar preview
                atualizarPreview();
                
                // Vibrar se disponível
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }
            }
        }
    }
    
    // Resetar variáveis
    touchStarted = false;
    touchItem = null;
    touchStartIndex = null;
} 