import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  // Property database
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        // If this file does not exists, create an empty file
        this.#persist(); //THis creates the db.json file everytime the app is initialized!
      });
  }

  #persist() {
    fs.writeFile("db.json", JSON.stringify(this.#database)); // writeFile method only accept to write strings
  }

  // method select
  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  // method insert()
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
