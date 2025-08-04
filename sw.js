/*
===============================
    HFileEasy - Service Worker
===============================
Service Worker para funcionamento offline da aplicação
Permite uso da aplicação mesmo sem conexão à internet
Desenvolvido por Hagatha Pereira - 2025
*/

// ===== CONFIGURAÇÕES DO CACHE =====
const CACHE_NAME = 'hfileeasy-v1'; // Nome da versão do cache

// Lista de arquivos a serem armazenados no cache para funcionamento offline
const urlsToCache = [
    '/',                           // Página inicial
    '/index.html',                 // Arquivo HTML principal
    '/styles.css',                 // Estilos CSS
    '/script.js',                  // Script JavaScript principal
    '/merck.jpeg',                 // Logo da empresa
    // Fonte externa do Google Fonts
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    // Biblioteca jsPDF para geração de PDFs
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// ===== INSTALAÇÃO DO SERVICE WORKER =====
// Evento executado quando o service worker é instalado pela primeira vez
self.addEventListener('install', function(event) {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME) // Abre o cache com o nome especificado
            .then(function(cache) {
                console.log('Cache aberto:', CACHE_NAME);
                // Adiciona todos os arquivos da lista ao cache
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log('Todos os arquivos foram armazenados no cache');
            })
            .catch(function(error) {
                console.error('Erro ao armazenar arquivos no cache:', error);
            })
    );
});

// ===== INTERCEPTAÇÃO DE REQUISIÇÕES =====
// Evento executado sempre que uma requisição é feita
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request) // Procura a requisição no cache
            .then(function(response) {
                // Se encontrou no cache, retorna a versão armazenada
                if (response) {
                    console.log('Arquivo servido do cache:', event.request.url);
                    return response;
                }
                
                // Se não encontrou no cache, busca na internet
                console.log('Arquivo buscado da internet:', event.request.url);
                return fetch(event.request);
            })
            .catch(function(error) {
                console.error('Erro ao buscar arquivo:', error);
            })
    );
});

// ===== ATUALIZAÇÃO DO CACHE =====
// Evento executado quando o service worker é ativado
self.addEventListener('activate', function(event) {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Remove versões antigas do cache
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(function() {
            console.log('Cache atualizado com sucesso');
        })
    );
}); 