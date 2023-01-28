const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach(function() {
    rootVampire = new Vampire("root");
  });

  describe("vampireWithName", function() {
    let offspring1, offspring2, offspring3, offspring4, offspring5;
    beforeEach(() => {
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
    });

    context("when searching with a name that exists in the tree", () => {
      it("should return the vampire with that name", () => {
        expect(rootVampire.vampireWithName(rootVampire.name).name).to.equal(rootVampire.name);
        expect(rootVampire.vampireWithName(offspring1.name).name).to.equal(offspring1.name);
        expect(rootVampire.vampireWithName(offspring2.name).name).to.equal(offspring2.name);
        expect(rootVampire.vampireWithName(offspring5.name).name).to.equal(offspring5.name);
        expect(offspring3.vampireWithName(offspring5.name).name).to.equal(offspring5.name);
      });
    });

    context("when searching with a name that does not exist in the tree", () => {
      it("should return null", () => {
        expect(rootVampire.vampireWithName("")).to.equal(null);
        expect(offspring2.vampireWithName(offspring5.name)).to.equal(null);
      });
    });
  });
});
