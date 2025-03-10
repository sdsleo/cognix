# Setup
<p>
  Caso não tenha o NVM instalado 
  https://github.com/coreybutler/nvm-windows
</p>

<P>
  O projeto usa node como o core principal de desenvolvimento, o vite esta sendo o transpile.
  o projeto foi iniciado usando o <strong>yarn</strong> logo evite p npm i, pois as referencias de pacotes e 
  suas devidas versoes está no <strong>tarn.lock</strong>
</P>

## Node Version
<p>Ao abrir o projeto rode o comando abaixo para a engine estar adequada com o projeto</p>

```node
  nvm use
```

## Caso não tenha o yarn isntalado
<p>Abra o projeto e rode o comando </p>

```node
  npm run setup
```

<p>
  Com isso o yarn vai ser adicionado
</p>


## Instalando a versão do Node especifica do projeto 
```bash
  nvm install 'versão do node'
```

## Adicionar uma nova tela
 ```txt
  => src/components/MenuSideBar/menu.json: adicionar objeto no json.

  => src/components/MenuSideBar/dynamicsSVGImports.tsx: adicionar importação componente icone.

  => src/modules => Criar novo modulo. 

  => src/components/MainViewContainer: adicionar importação modulo.
 ```

 https://developer.microsoft.com/en-us/fluentui#/styles/web/icons#usage-svg-icons