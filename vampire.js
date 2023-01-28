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
}




module.exports = Vampire;

