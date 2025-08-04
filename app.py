"""
HFileEasy - Hagatha PDF Creator
===============================
Servidor Flask simples para servir a aplicação frontend de criação de PDFs.
Este servidor apenas serve os arquivos estáticos (HTML, CSS, JS) e não processa PDFs.
O processamento é feito totalmente no navegador usando JavaScript.

Autor: Hagatha Pereira
Data: 2025
"""

# ===== IMPORTAÇÕES =====
from flask import Flask, send_from_directory, render_template_string
import os

# ===== CONFIGURAÇÃO DA APLICAÇÃO FLASK =====
app = Flask(__name__)

# ===== ROTAS DO SERVIDOR =====

@app.route('/')
def index():
    """
    Rota principal - Serve o arquivo index.html
    Esta é a página inicial da aplicação HFileEasy
    Quando o usuário acessa o servidor na raiz (/), retorna o arquivo principal
    """
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """
    Rota para servir arquivos estáticos
    Serve todos os outros arquivos (CSS, JS, imagens) necessários para a aplicação
    
    Args:
        filename (str): Nome do arquivo a ser servido (ex: styles.css, script.js, merck.jpeg)
    
    Returns:
        File: Arquivo solicitado do diretório atual
        
    Exemplos de arquivos servidos:
    - styles.css (estilos da aplicação)
    - script.js (funcionalidades JavaScript)
    - merck.jpeg (logo da empresa)
    - sw.js (service worker para funcionalidade offline)
    """
    return send_from_directory('.', filename)

@app.route('/healthcheck')
def healthcheck():
    """
    Endpoint de verificação de saúde do servidor
    Usado para verificar se o servidor está funcionando corretamente
    Útil para monitoramento e deploy automatizado
    
    Returns:
        dict: JSON com status e mensagem do servidor
    """
    return {"status": "ok", "message": "HFileEasy server running"}

# ===== INICIALIZAÇÃO DO SERVIDOR =====
if __name__ == '__main__':
    # Mensagens informativas de inicialização
    print("🌸 Iniciando HFileEasy - Hagatha PDF Creator")
    print("🔗 Acesse: http://localhost:5005")
    print("📝 Aplicação totalmente frontend rodando com Flask")
    
    # Inicia o servidor Flask com as seguintes configurações:
    # debug=True: Habilita modo de debug para desenvolvimento (reinicia automaticamente)
    # host='0.0.0.0': Permite acesso de qualquer IP (não apenas localhost)
    # port=5005: Define a porta 5005 para o servidor
    app.run(debug=True, host='0.0.0.0', port=5005) 




    #feito de forma simples usando flask , mas facil de implementar em qualquer servidor