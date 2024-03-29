-- Ex. 1, p.1
create table account(
    id serial primary key,
    name varchar(100),
    credit int
);
insert into account(name, credit) values ('Account1', 1000);
insert into account(name, credit) values ('Account2', 1000);
insert into account(name, credit) values ('Account3', 1000);


start transaction;
update account
    set credit = credit - 500
    where name = 'Account1';
update account
    set credit = credit + 500
    where name = 'Account2';
end transaction;

start transaction;
update account
    set credit = credit - 700
    where name = 'Account2';
update account
    set credit = credit + 700
    where name = 'Account1';
end transaction;

start transaction;
update account
    set credit = credit - 100
    where name = 'Account2';
update account
    set credit = credit + 100
    where name = 'Account3';
end transaction;


select * from account;

-- Ex. 1, p.2
alter table account add column bankName varchar(20);
update account
    set bankName = 'SpearBank'
    where id = 1 or id = 3;
update account
    set bankName = 'Tinkoff'
    where id = 2;
insert into account(name, credit) values ('Account4', 0);


start transaction;
update account
    set credit = credit - 500
    where name = 'Account1';
update account
    set credit = credit + 500
    where name = 'Account3';
end transaction;

start transaction;
update account
    set credit = credit - 700 - 30
    where name = 'Account2';
update account
    set credit = credit + 700
    where name = 'Account1';
update account
    set credit = credit + 30
    where name= 'Account4';
end transaction;

start transaction;
update account
    set credit = credit - 100 - 30
    where name = 'Account2';
update account
    set credit = credit + 100
    where name = 'Account3';
update account
    set credit = credit + 30
    where name= 'Account4';
end transaction;


select * from account;


-- Ex. 1, p.3
create table ledger(
  id serial primary key,
  "from" int,
  "to" int,
  fee int,
  amount int,
  transactionDateTime timestamp
);


start transaction;
update account
    set credit = credit - 500
    where name = 'Account1';
update account
    set credit = credit + 500
    where name = 'Account3';
insert into ledger("from", "to", fee, amount, transactionDateTime) values ((select id from account where "name" = 'Account1'),
                                                                           (select id from account where "name" = 'Account3'),
                                                                           0,
                                                                           500,
                                                                           now());
end transaction;

start transaction;
update account
    set credit = credit - 700 - 30
    where name = 'Account2';
update account
    set credit = credit + 700
    where name = 'Account1';
update account
    set credit = credit + 30
    where name= 'Account4';
insert into ledger("from", "to", fee, amount, transactionDateTime) values ((select id from account where "name" = 'Account2'),
                                                                           (select id from account where "name" = 'Account1'),
                                                                           30,
                                                                           700,
                                                                           now());
end transaction;

start transaction;
update account
    set credit = credit - 100 - 30
    where name = 'Account2';
update account
    set credit = credit + 100
    where name = 'Account3';
update account
    set credit = credit + 30
    where name= 'Account4';
insert into ledger("from", "to", fee, amount, transactionDateTime) values ((select id from account where "name" = 'Account2'),
                                                                           (select id from account where "name" = 'Account3'),
                                                                           30,
                                                                           100,
                                                                           now());
end transaction ;


select * from ledger;
