# Sistema de atualização cadastral dos dados dos responsáveis

# Estratégia de Transformação Digital e Governo Aberto na SME

Como um governo pode atuar para garantir o bem comum de todos? Na SME, acreditamos que um dos meios para isso seja garantir transparência e prestação de contas e constante relação entre governo e sociedade para o desenvolvimento e implementação de políticas públicas. 

A Portaria SME nº 8.008, de 12 de novembro de 2018 oficializou a estratégia da Secretaria Municipal de Educação de SP para que nossas ações sejam pautadas nos princípios de Governo Aberto e para usarmos os valores e benefícios do mundo digital para melhorarmos nossos processos e serviços para os cidadãos. 
Com isso, pretendemos: 
- aumentar os níveis de transparência ativa e de abertura de dados, garantindo a proteção de dados pessoais; 
- instituir metodologias ágeis e colaborativas como parte do processo de desenvolvimento e de evolução de sistemas administrativos e de serviços digitais; 
- fortalecer o controle das políticas educacionais e da aplicação de recursos por parte da gestão e da sociedade; 
- promover espaços e metodologias de colaboração entre governo, academia, sociedade civil e setor privado. 

O [Ateliê do Software](http://forum.govit.prefeitura.sp.gov.br/uploads/default/original/1X/c88a4715eb3f9fc3ceb882c1f6afe9e308805a17.pdf) é uma das ferramentas para operacionalização. Baseado em um modelo de contratação inspirado pelos movimentos ágil e de Software Craftsmanship, trabalhamos com equipes multidisciplinares para o desenvolvimento de produtos que beneficiam toda a comunidade escolar (técnicos da SME e DREs, gestores, professores, alunos e famílias) e concretizam os objetivos da Estratégia de Transformação Digital e Governo Aberto “Pátio Digital”.

# Conteúdo

 1. [Sobre o Produto](#Sobre-o-Produto)
 2. [Sobre o Time](#Sobre-o-Time)
 3. [Como surgiu](#Como-surgiu)
 4. [Links Úteis](#Links-Úteis)
 5. [Comunicação](#Comunicação)
 6. [Como contribuir](#como-contribuir)
 7. [Repositórios](#Repositórios)
 8. [Instalação e Configuração](#Instalação-e-Configuração)
 
# Sobre o Produto

## Visão de Futuro

Para **o(a) responsável por um(a) estudante matriculado(a) na Rede Municipal de Ensino** 

É **uma aplicação web responsiva**

Que **permite consultar se os dados de cadastro estão corretos sem precisar ir até a escola, a fim de estar apto a receber os benefícios dos Programas Auxílio Uniforme Escolar e Auxílio Material Escolar (quando fizerem parte do público desses programas)**

Diferentemente do **modelo presencial de atualização do cadastro na secretaria da escola**

Nosso produto **garante agilidade e segurança na atualização cadastral**

## Objetivos de negócio 

A Atualização Cadastral teve uma primeira vesão com o objetivo de completar as lacunas nos cadastros dos responsáveis pelos estudantes no Sistema Escola Online (EOL), permitindo que eles enviem os dados com segurança pela internet, sem precisar ir à escola – e que, assim, estejam aptos a receber os benefícios dos Programas Auxílio Uniforme Escolar e Auxílio Material Escolar quando fizerem parte do público desses programas). Em sua segunda versão, se tornou um portal para que responsáveis pelos estudantes pudessem conferir se o status do cadastro.

## Personas 

**Responsável pelo(a) estudante matriculado(a) na Rede Municipal de Ensino:** mãe, pai ou outro responsável legal cadastrado no Sistema Escola Online (EOL) que precise completar seus dados. 

**Servidores das escolas municipais:** acessam o ambiente administrativo e consultam o status dessa atualização cadastral na sua unidade. 

## Funcionalidades 

### Versão 1.0

- Formulário online para responsáveis completarem os dados de cadastro necessários para que recebam os benefícios dos Programas Auxílio Uniforme Escolar e Auxílio Material Escolar. 
- Ambiente administrativo para que escolas acessem um painel gerencial com o status da atualização cadastral em cada unidade educacional.  

### Versão 2.0
- A partir de agosto de 2021, o usuário que acessar o portal da Atualização Cadastral será direcionado para uma página de consulta de atualização cadastral.

## Jornadas 

### Versão 1.0
- O(a) usuário(a) responsável por um(a) estudante acessa a landing page de atualização cadastral via Portal do Uniforme ou Portal do Material Escolar, digita o Código EOL e data de nascimento do(a) estudante, abre um formulário de atualização cadastral e preenche os dados necessários para receber os benefícios dos Programas Auxílio Uniforme Escolar e Auxílio Material Escolar. 
- O(a) usuário(a) servidor(a) de uma escola municipal acessa a página de entrada no ambiente administrativo, faz o login e consulta o painel gerencial com o status da atualização cadastral naquela unidade educacional.  

### Versão 2.0
- O usuário acessa o portal e digita o CPF de um dos responsáveis pelo estudante.
- O sistema retorna com o status do cadastro, informando se é necessário aguardar o contato da Unidade Escolar, se dirigir à Unidade Escolar ou se já é possível usufruir dos benefícios dos cartões de Uniforme e Material Escolar.

## Roadmap 

### Versão 1.0

- **Release 1:** 

- Landing page e formulário de atualização cadastral (exclusivo para público que recebe uniforme escolar).  

- **Release 2:** 

- Landing page e formulário de atualização cadastral ampliado para todos os estudantes da Rede Municipal de Ensino.  
- Ambiente administrativo logado para escolas, com consulta ao painel gerencial. 

### Versão 2.0

- Atualização do portal para que seja um espaço de consulta cadastral, não mais de atualização do cadastro.

# Sobre o Time

<table>
<thead>
<tr>
<th>Papel</th>
<th>Titular</th>
</tr>
</thead>
<tbody>
<tr>
<td>Product Owner</td>
<td>Natália Goes</td>
</tr>
<tr>
<td>Agente de Governança</td>
<td>Fernando Gonsales</td>
</tr>
<tr>
<td>Gerente de Projeto</td>
<td>Andrea Paiva </td>
</tr>
<tr>
<td>Scrum Master</td>
<td>Augusto César de  Brito Silva</td>
</tr>
<tr>
<td>Analista Programador</td>
<td>Kelwy Guedes de Oliveira</td>
</tr>
<tr>
<td>Analista Programador</td>
<td>Anderson M. Morais</td>
</tr>
<tr>
<td>Analista de testes</td>
<td>Paula Pimentel</td>
</tr>
</tbody>
</table>

# Como surgiu 

Em 2020 o novo modelo descentralizado de compra do uniforme escolar diretamente pelas famílias, nas lojas credenciadas, começou a ser implantado. Como regra de negócio, então, havia a necessidade do(a) responsável solicitar o crédito e realizar a atualização cadastral. E, para isso, foi construído um sistema completo de acompanhamento e tratamento das solicitações.   

Em 2021, com o Programa Auxílio Uniforme Escolar, as famílias já não precisavam fazer a solicitação do benefício. No entanto, como muitos cadastros dos responsáveis ainda estavam incompletos, o sistema de atualização cadastral foi adaptado para sanar essas lacunas e já abranger todos os estudantes com matrícula ativa da Rede Municipal de Ensino, inclusive os de CEI, Ensino Médio e Educação de Jovens e Adultos (que recebem apenas material escolar). Em agosto, o sistema passou a ser um espaço de consulta cadastral, não mais de atualização do cadastro.

## Protótipos

- Página inicial do Portal do Material Escolar: https://www.figma.com/file/KmU2TEtEWQWTaJM4ejDlqR/Material-Escolar-Sprint-11?node-id=2%3A11
- Página inicial do Portal do Uniforme: https://www.figma.com/file/gV75TLrTMjvvrwLTDWCPyH/Uniformes-Sprint-15?node-id=2%3A227
- Páginas do Portal de Atualização Cadastral: https://www.figma.com/file/B2qCxijqjZrZHg829NaJ50/ATUALIZA%C3%87%C3%83O-CADASTRAL?node-id=67%3A2

# Links Úteis 

**Homologação:**

https://hom-atualizacaocadastral.sme.prefeitura.sp.gov.br/  

**Produção:**

https://atualizacaocadastral.sme.prefeitura.sp.gov.br/  

# Comunicação:

| Canal de comunicação | Objetivos |
|----------------------|-----------|
| [Issues do Github](https://github.com/prefeiturasp/SME-AtualizacaoCadastral-Frontend/issues) | - Sugestão de novas funcionalidades<br> - Reportar bugs<br> - Discussões técnicas |

# Como contribuir

Contribuições são **super bem vindas**! Se você tem vontade de construir o Sistema de Atualização Cadastral conosco, veja o nosso [guia de contribuição](./CONTRIBUTING.md) onde explicamos detalhadamente como trabalhamos e de que formas você pode nos ajudar a alcançar nossos objetivos. Lembrando que todos devem seguir  nosso [código de conduta](./CODEOFCONDUCT.md).

# Repositórios 

https://github.com/prefeiturasp/SME-AtualizacaoCadastral.git 

https://github.com/prefeiturasp/SME-AtualizacaoCadastral-Backend.git 

https://github.com/prefeiturasp/SME-AtualizacaoCadastral-Frontend.git 

# Instalação e Configuração


