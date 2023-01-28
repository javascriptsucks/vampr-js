class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    //let generation = 0;
    //let currentVampr = this;
    //while (currentVampr.creator) {
    //  generation++;
    //  currentVampr = currentVampr.creator;
    //}
    //return generation;
    if (!this.creator) {
      return 0;
    }
    return 1 + this.creator.numberOfVampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const currentVampr = this;
    return currentVampr.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const thisAncestors = [this];
    if (!this.creator || this === vampire) return this;
    if (!vampire.creator) return vampire;
    let currentVampr = this;
    while (currentVampr.creator) {
      thisAncestors.push(currentVampr.creator);
      currentVampr = currentVampr.creator;
    }
    let tempVamp = vampire;
    while (tempVamp.creator) {

      if (thisAncestors.includes(tempVamp)) {
        return tempVamp;
      }

      tempVamp = tempVamp.creator;
      if (!tempVamp.creator) return tempVamp;
    }
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  //vampireWithName(name) {
  //  if (this.name === name) {
  //    return this;
  //  }
  //  let res = null;
  //  if (this.offspring) {
  //    for (const descendent of this.offspring) {
  //      //console.log(descendent.name, name);
  //      //console.log(descendent.name === name);
  //      if (descendent.name === name) {
  //        res = descendent;
  //      } else {
  //        res = descendent.vampireWithName(name);
  //      }
  //    }
  //  }
  //  return res;
  //}

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (let child of this.offspring) {
      if (child.vampireWithName(name) !== undefined && child.vampireWithName(name) !== null) {
        return child.vampireWithName(name);
      }

    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (const descendent of this.offspring) {
      count++;
      if (descendent.offspring) {
        count = count + descendent.totalDescendents;
      }

    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let res = [];

    for (const descendent of this.offspring) {
      if (descendent.yearConverted > 1980) {
        res.push(descendent);
      }
      if (descendent.offspring) {
        res = res.concat(descendent.allMillennialVampires);
      }
    }
    return res;
  }



}


let rootVampire = new Vampire("root");

let offspring1, offspring2, offspring3, offspring4, offspring5;
offspring1 = new Vampire("andrew");
offspring2 = new Vampire("sarah");
offspring3 = new Vampire("c");
offspring4 = new Vampire("d");
offspring5 = new Vampire("e");
rootVampire.addOffspring(offspring1);
offspring1.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring4.addOffspring(offspring5);

console.log(rootVampire.vampireWithName(offspring5.name));

module.exports = Vampire;

