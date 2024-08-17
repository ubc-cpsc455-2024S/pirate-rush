// MONGODB collection names
const PLAYERS_COLLECTION = 'players'
const PIRATE_POOL_COLLECTION = 'pirate_pool'
const BOSS_POOL_COLLECTION = 'boss_pool'

// Characters
const LUFFY = 'Luffy';
const ZORO = 'Zoro';
const NAMI = 'Nami';
const USOPP = 'Usopp';
const SANJI = 'Sanji';
const ROBIN = 'Robin';
const CHOPPER = 'Chopper';
const BROOK = 'Brook';
const FRANKY = 'Franky';
const JINBEI = 'Jinbei';
const PORTGAS_D_ACE = 'Portgas D. Ace';
const YAMATO = 'Yamato';
const GOL_D_ROGER = 'Gol D. Roger';
const ODEN_KOZUKI = 'Oden Kozuki';

const CHARACTER_NAMES = [
  LUFFY,
  ZORO,
  NAMI,
  USOPP,
  SANJI,
  ROBIN,
  CHOPPER,
  BROOK,
  FRANKY,
  JINBEI,
  YAMATO,
  PORTGAS_D_ACE,
  GOL_D_ROGER,
  ODEN_KOZUKI,
];

const COMMON = "common"
const EPIC = "epic"
const LEGENDARY = "legendary"

const RARITY_VALUE = {
  [COMMON]: 1,
  [EPIC]: 2,
  [LEGENDARY]: 5,
};

const RARITY_MODIFIER = {
  [COMMON]: 0.1,
  [EPIC]: 0.2,
  [LEGENDARY]: 0.35,
};

const MAX_CREW_SIZE = 6
const MAX_LEVEL = 99

module.exports = {
  LUFFY,
  ZORO,
  NAMI,
  USOPP,
  SANJI,
  ROBIN,
  CHOPPER,
  BROOK,
  FRANKY,
  JINBEI,
  PORTGAS_D_ACE,
  YAMATO,
  GOL_D_ROGER,
  ODEN_KOZUKI,
  CHARACTER_NAMES,
  COMMON,
  EPIC,
  LEGENDARY,
  RARITY_VALUE,
  RARITY_MODIFIER,
  MAX_CREW_SIZE,
  MAX_LEVEL,
  PLAYERS_COLLECTION,
  PIRATE_POOL_COLLECTION,
  BOSS_POOL_COLLECTION
};
