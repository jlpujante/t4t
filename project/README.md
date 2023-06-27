bower install

vim /etc/postgresql/9.5/main/pg_hba.conf
local   all             postgres                                trust

/etc/init.d/postgresql restart
psql -Upostgres
postgres=# ALTER USER "postgres" WITH PASSWORD 'postgres';
vim /etc/postgresql/9.5/main/pg_hba.conf
local   all             postgres                                password
