const { default: Resolution } = require("@unstoppabledomains/resolution");
const resolution = new Resolution();
const URL = "bolt://localhost:7687"
const LOAD = `LOAD CSV WITH HEADERS FROM 'https://bafybeicz74szxnllx7vbtfwk6lykaflzkag7ofkihlzs77mzmyh2zaxcde.ipfs.dweb.link/hackmoney.csv'  AS row
WITH row WHERE row.contract_name IS NOT NULL
MERGE (:Contract {contract_address:row.contract_address,contract_name:row.contract_name});`

/**
 *
 * @param {*} domain
 * @param {*} currency
 */
function resolve(domain, currency) {
  resolution
    .addr(domain, currency)
    .then((address) => console.log(domain, "resolves to", address))
    .catch(console.error);
}
/**
 *
 * @param {*} domain
 * @param {*} currency
 * @param {*} chain
 */
function resolveMultiChain(domain, currency, chain) {
  resolution
    .multiChainAddr(domain, currency, chain)
    .then((address) => console.log(domain, "resolves to", address, version))
    .catch(console.error);
}
/**
 * Neo4J Query https://neo4j.com/developer/javascript/
 */
const neo4j = require("neo4j-driver");
const personName = "brad.crypto";

async function loadCSV() {
    const driver = neo4j.driver(
      URL,
      neo4j.auth.basic("", "")
    );
    const session = driver.session();
    try {
       await session.run(
        `${LOAD}`
      );
    } finally {
      await session.close();
    }
    await driver.close();
  }
/**
 * 
 * @param {*} personName 
 */
async function createPerson(personName) {
  const driver = neo4j.driver(
    URL,
    neo4j.auth.basic("", "")
  );
  const session = driver.session();

  try {
    const address = await resolve("brad.crypto", "ETH");
    const result = await session.run(
      `CREATE (a:Person {name: $name, address:'0x8aaD44321A86b170879d7A244c1e8d360c99DdA8'}) RETURN a`,
      { name: personName }
    );

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
  } finally {
    await session.close();
  }

  await driver.close();
}



loadCSV()
createPerson(personName);

resolve("brad.crypto", "ETH");
resolve("brad.crypto", "BTC");

//MATCH (n:Person{name:'brad.crypto'}) DETACH DELETE n
