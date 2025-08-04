# 🌸 HFileEasy - Conversor de Imagens para PDF

## 📋 Visão Geral

**HFileEasy** é uma aplicação web profissional desenvolvida pela **Hagatha Pereira** para converter múltiplas imagens em documentos PDF de alta qualidade. A solução foi criada especificamente para uso empresarial, priorizando **segurança**, **privacidade** e **eficiência**.

### ✨ Características Principais

- 🔒 **100% Privado**: Todo processamento é feito localmente no navegador
- 🚫 **Sem Upload de Dados**: Nenhuma imagem é enviada para servidores externos
- 🖥️ **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- 📱 **Funcionamento Offline**: Service Worker permite uso sem internet
- ⚡ **Alta Performance**: Otimização automática de imagens
- 🎨 **Editor Integrado**: Rotação e corte de imagens antes da conversão

---

## 🔐 Segurança e Privacidade Empresarial

### Garantias de Segurança

✅ **Processamento Local**: Todas as imagens são processadas diretamente no navegador do usuário  
✅ **Zero Upload**: Nenhum dado é transmitido para servidores externos  
✅ **Sem Armazenamento**: Imagens não são salvas em servidores ou bancos de dados  
✅ **Conformidade LGPD**: Não há coleta ou tratamento de dados pessoais  
✅ **Auditável**: Código fonte aberto e verificável  

### Fluxo de Dados Seguro

```
🖼️ Imagens Locais → 🧠 Navegador (Processamento) → 📄 PDF Local
        ↑                                              ↓
    [SEM UPLOAD]                               [SEM VAZAMENTO]
```

### Tecnologias Utilizadas para Segurança

- **Frontend Only**: Processamento 100% client-side
- **HTTPS**: Comunicação criptografada
- **Service Worker**: Cache local seguro
- **jsPDF**: Biblioteca confiável para geração de PDFs

---

## 🛠️ Funcionalidades Detalhadas

### 📤 Upload e Gerenciamento
- **Drag & Drop** intuitivo de múltiplas imagens
- **Suporte a formatos**: PNG, JPEG, JPG, GIF, WebP
- **Validação automática** de tipos e tamanhos (máx. 50MB por arquivo)
- **Preview visual** com informações detalhadas

### ✏️ Editor de Imagens
- **Rotação**: 90°, 180°, 270° em qualquer direção
- **Corte personalizado**: Seleção visual de área desejada
- **Interface touch**: Funcionalidades completas em dispositivos móveis

### 📑 Configurações de PDF
- **Título personalizado**: Primeira página com título destacado
- **Autor/Elaborador**: Rodapé automático em todas as páginas
- **Layout flexível**: 1 ou 2 imagens por página
- **Numeração**: Opcional de páginas
- **Nome do arquivo**: Personalização completa com data automática

### 🔄 Organização
- **Reordenação visual**: Drag & drop para reorganizar ordem
- **Controles mobile**: Botões específicos para smartphones/tablets
- **Preview em tempo real**: Visualização instantânea das alterações
- **Backup automático**: Função "Resetar Ordem" para voltar ao original


---

## 📖 Manual de Uso

### Passo a Passo Completo

1. **📤 Carregamento de Imagens**
   - Arraste arquivos para a área destacada OU
   - Clique em "Escolher Imagens" para seleção manual
   - Aguarde o processamento automático

2. **🔧 Configuração (Opcional)**
   - Defina título do documento
   - Informe o nome do elaborador
   - Escolha o nome do arquivo de saída
   - Selecione layout (1 ou 2 imagens por página)

3. **✏️ Edição de Imagens (Opcional)**
   - Clique no ícone "✏️" em qualquer imagem
   - Use os controles de rotação e corte
   - Salve as alterações

4. **📄 Geração do PDF**
   - Clique em "📄 Gerar PDF"
   - Confirme as configurações na prévia
   - Aguarde o processamento
   - Download automático ao finalizar


## 🏗️ Arquitetura Técnica

### Estrutura de Arquivos

```
HFileEasy/
├── 📄 app.py           # Servidor Flask (apenas arquivos estáticos)
├── 🌐 index.html       # Interface principal
├── 🎨 styles.css       # Estilos responsivos (1387 linhas)
├── ⚡ script.js        # Lógica principal (1773 linhas)
├── 🔧 sw.js           # Service Worker (funcionamento offline)
├── 🖼️ merck.jpeg      # Logo empresarial
└── 📚 README.md       # Documentação
```
### Tecnologias Utilizadas

| Componente | Tecnologia | Versão | Propósito |
|------------|------------|---------|-----------|
| **Backend** | Flask | Latest | Servidor de arquivos estáticos |
| **Frontend** | HTML5/CSS3/JS | ES6+ | Interface e lógica principal |
| **PDF Engine** | jsPDF | 2.5.1 | Geração de documentos PDF |
| **Fontes** | Google Fonts | Poppins | Tipografia moderna |
| **Cache** | Service Worker | HTML5 | Funcionamento offline |

---


---

## 📊 Especificações Técnicas

### Requisitos de Sistema

| Componente | Mínimo | Recomendado |
|------------|---------|-------------|
| **RAM** | 512MB | 2GB+ |
| **CPU** | 1 core | 2+ cores |
| **Armazenamento** | 100MB | 500MB+ |
| **Navegador** | Chrome 70+ | Chrome/Firefox 90+ |
| **Internet** | Primeira execução | Opcional (offline) |

### Limites Operacionais

- **Máximo por imagem**: 50MB
- **Formatos suportados**: PNG, JPEG, JPG, GIF, WebP
- **Resolução máxima**: Otimização automática para 2000x2000px
- **Imagens simultâneas**: Limitado apenas pela RAM do dispositivo
- **Tamanho do PDF**: Dependente das imagens carregadas

### Performance

- **Tempo de carregamento inicial**: < 3 segundos
- **Processamento de imagem**: ~500ms por imagem (1MB)
- **Geração de PDF**: ~1-2 segundos por página
- **Funcionamento offline**: 100% após primeiro carregamento

---


## 👥 Suporte e Contato

### Desenvolvedora
**Hagatha Pereira**  
📧 Email: hagatha.pereira@merckgroup.com  
🏢 Empresa: Merck Group  
📅 Ano: 2025  


## 🏆 Benefícios para a Empresa

### 💰 Econômicos
- **Zero custos** de licenciamento de software externo
- **Sem assinaturas** mensais de serviços online
- **Redução de tempo** no processamento de documentos
- **Economia de papel** com digitalização eficiente

### 🔒 Segurança
- **Conformidade total** com políticas de privacidade
- **Controle absoluto** sobre dados sensíveis
- **Auditabilidade completa** do processo
- **Sem dependência** de serviços terceirizados

### 📈 Produtividade
- **Interface intuitiva** reduz tempo de treinamento
- **Funcionamento offline** garante disponibilidade
- **Processamento rápido** acelera fluxos de trabalho
- **Qualidade profissional** dos PDFs gerados

---

> 💡 **Nota**: Esta aplicação foi desenvolvida seguindo as melhores práticas de segurança e privacidade para uso corporativo. Todo o processamento é realizado localmente, garantindo que dados sensíveis permaneçam dentro do ambiente controlado da empresa.

---

*Desenvolvido por Hagatha Pereira para Merck Group - 2025* 