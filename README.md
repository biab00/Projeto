# Projeto
Quem sabe um dia...

## Stack de Desenvolvimento

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** (v5.1.0) - Framework web para rotas e middleware

### Frontend
- **EJS** (v3.1.10) - Template engine para renderização server-side
- **HTML5/CSS3** - Estrutura e estilização das páginas
- **JavaScript** - Scripts client-side

### Banco de Dados
- **MySQL** - Banco de dados relacional
- **mysql2** (v3.15.3) - Driver MySQL para Node.js

### Segurança
- **bcrypt** (v6.0.0) - Criptografia de senhas

### Arquitetura
- **MVC (Model-View-Controller)** - Padrão de arquitetura utilizado

### Estrutura do Projeto
```
├── server.js              # Ponto de entrada da aplicação
├── scr/
│   ├── app.js             # Configuração do Express
│   ├── config/            # Configurações (banco de dados)
│   ├── controller/        # Controladores (lógica de requisições)
│   ├── model/             # Modelos (acesso ao banco de dados)
│   ├── router/            # Definição de rotas
│   ├── views/             # Templates EJS
│   └── public/            # Arquivos estáticos (CSS, JS, imagens)
```

### Como Executar
1. Instale as dependências: `npm install`
2. Configure o banco de dados MySQL em `scr/config/bd_mysql.js`
3. Inicie o servidor: `node server.js`
4. Acesse: `http://localhost:3000`
