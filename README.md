
# Hack Money 2022

LOAD CSV FROM 'https://data.neo4j.com/northwind/customers.csv'

Vitalik Address
>0xd8da6bf26964af9d7eed9e03e53415d37aa96045


## Covalent

VITALIK.eth 
0xd8da6bf26964af9d7eed9e03e53415d37aa96045

**Vitalik.eth**

Return current token balances along with their spot prices. This endpoint supports a variety of token standards like ERC20, ERC721 and ERC1155. As a special case, network native tokens like ETH on Ethereum are also returned even though it's not a token contract.

![](https://i.imgur.com/M5A1htu.png)
![](https://i.imgur.com/5hKKIoT.png)
![](https://i.imgur.com/8LwnzSK.png)
![](https://i.imgur.com/gpJoGDd.png)
![](https://i.imgur.com/u6cTdEH.png)

![](https://i.imgur.com/Bfm98Mh.png)

## IPFS
```
LOAD CSV WITH HEADERS FROM 'https://bafybeicz74szxnllx7vbtfwk6lykaflzkag7ofkihlzs77mzmyh2zaxcde.ipfs.dweb.link/hackmoney.csv'  AS row
WITH row WHERE row.contract_name IS NOT NULL
MERGE (:Contract {contract_address:row.contract_address,contract_name:row.contract_name});


MATCH (n)
DETACH DELETE n
```
Vitalik balances
```
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/aadorian/4f0dc8f809b4334f075bec23617754e1/raw/debe3fcddf3a04f77524c0c5bb2f58aa2bca5b26/covalent.csv'  AS row
CREATE (contract:Contract { name: row.contract_name, ticker_symbol: row.contract_tickersymbol, balance: row.balance, 
address: row.contract_address})
```
Vitalik Transactions (This month)

```
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/aadorian/db978bca47eadc20394806a95ec05ddc/raw/906fb2fe3b53030ecc54fc5a5b789dfef2942db6/Transactions.csv'  AS row
CREATE (contract:Transactions{ datetime: row.DateTime, transaction_hash: row.Txhash, from_:row.From, to_:row.To}))
```
Edges from Vitalik 
```
MATCH (t:Transactions)
WHERE t.from_='0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
MERGE (t)-[:FROM_VITALIK]->(t) 
```
Edge to Vitalik 
```
MATCH (t:Transactions)
WHERE t.to_='0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
MERGE (t)-[:TO_VITALIK]->(t)
```

CALL dbms.procedures()
CALL db.schema.visualization()

MATCH (n)  RETURN  n  ORDER BY n.balance DESC LIMIT 10

MATCH (c:Contract) WHERE c.address ='0xd8da6bf26964af9d7eed9e03e53415d37aa96045' RETURN  c

MATCH (c:Contract) WHERE c.balance <'1570302964772847059538821345602' RETURN  c LIMIT 10

## Unstoppable Domains

>function resolve(domain, currency) {
  return ...
}

https://hack.ethglobal.com/hackmoney2022/home
