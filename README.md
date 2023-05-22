# SIG - Sistemas de Informação Geográfica
### Projeto de Sistemas de Informação Geográfica
#### Plataforma para Propostas de Estágio

---

## Ubuntu Installation:

### BackEnd

### Installar o python3:
[Install Python](https://beebom.com/how-install-python-ubuntu-linux/)

### Installar o pip3:
```bash
sudo apt install python3-pip
```

### Ativar em Ubuntu o Virtual Env:
```bash
source myvenv/Scripts/activate
```

### Cria a Base de dados pela linha de comandos
[Create database from terminal](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

### Instala o PgAdmin4 e acede á base de dados:
[Install PgAdmin4](https://www.pgadmin.org/download/pgadmin-4-apt/)

### Installar tudo com pip no Backend dentro do (myvenv)

```bash
pip3 install django
pip3 install djangorestframework
pip3 install djangorestframework-gis
pip3 install django-cors-headers
pip3 install djoser
pip3 install psycopg2-binary
```

### GDAL:

[Install GDAL Documentation](https://mothergeo-py.readthedocs.io/en/latest/development/how-to/gdal-ubuntu-pkg.html)

```bash
sudo apt-get install gdal-bin
sudo apt-get install libgdal-dev
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
pip install GDAL==3.4.0
```

---

## FrontEnd

```bash
sudo apt-get install npm
npm install
npm start
```

## Para Fazer:

1. Após o registo encaminhar para Login em vez da Homepage
2. Corrigir Bug de conta não iniciada ao adicionar estágio - (Deve ter a haver com inconsistência entre /profile e /perfil
