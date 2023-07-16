export interface Box {
  children?: JSX.Element | JSX.Element[];
}

export interface Inputs {
  type: string;
  title: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IOption {
  label: string;
  value: string | number;
}

export interface ISelect {
  title: string;
  options: IOption[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IBarStatus {
  typeBar?: string;
  maximumValue: number;
  currentValue: number;
  onChangeCurrent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUpCurrent?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeMaximum: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUpMaximum?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface ObjPersonal {
  objPersonal: {
    age: number;
    birthplace: string;
    class: string;
    genre: string;
    name: string;
    origin: string;
    patent: string;
    placeResidence: string;
    player: string;
  };
  uid: string;
}

export interface IInfoPlayer {
  name: string;
  player: string;
  origin: string;
  age: number;
  genre: string;
  birthplace: string;
  placeResidence: string;
  class: string;
  patent: string;
}

export interface ObjAttri {
  objAttri: {
    agility: number;
    energy: number;
    force: number;
    intelligence: number;
    presence: number;
  };
}

export interface Check {
  value: boolean;
  name: string;
}

export interface Defeat {
  name: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
}

export interface DisplayState {
  [key: number]: boolean;
}

export interface ICombatWeapon {
  uid: string;
  arrayGuns: {
    ammunition: string;
    category: string;
    critical: string;
    damage: string;
    name: string;
    proficiency: string;
    reach: string;
    type: string;
  }[];
}

export interface ISkills {
  uid: string;
  arraySkills: {
    bonus: number;
    keyAttribute: string;
    other: number;
    skillName: string;
    trained: string;
    trainedValue: number;
  }[];
}

export interface IIconMap {
  [key: string]: React.ReactNode;
}

export interface IInventory {
  uid: string;
  arrayItem: {
    category: string;
    description?: string;
    name: string;
    spaces: number;
  }[];
}

export interface IRituals {
  uid: string;
  arrayRituals: {
    circle: string;
    damage: string;
    description: string;
    duration: string;
    element: string;
    execution: string;
    name: string;
    reach: string;
    resistance: string;
    target: string;
  }[];
}

export interface INewWeapon {
  name: string;
  type: string;
  ammunition: string;
  reach: string;
  critical: string;
  category: string;
  proficiency: string;
  damage: string;
}

export interface INewSkill {
  skillName: string;
  keyAttribute: string;
  bonus: number;
  other: number;
  trained: string;
  trainedValue: number;
}

export interface INewItem {
  name: string;
  description?: string;
  category: string;
  spaces: number;
}

export interface INewRitual {
  name: string;
  element: string;
  reach: string;
  duration: string;
  execution: string;
  target: string;
  resistance: string;
  circle: string;
  description: string;
  damage: string;
}

export interface INewStatus {
  currentLife: number;
  currentEffort: number;
  currentSanity: number;
  maximumLife: number;
  maximumEffort: number;
  maximumSanity: number;
  nex: number;
  defense: number;
  protection: number;
  resistance: number;
  displacement: string;
}

export interface INewAttributes {
  agility: number;
  energy: number;
  force: number;
  intelligence: number;
  presence: number;
}

export interface IInputLogin {
  placeholder: string;
  type: string;
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IIdentificationCard {
  label: string;
  value: string | Date | undefined | number;
}

export interface IRecord {
  Attributes: {
    agility: number;
    presence: string;
    energy: string;
    force: string;
    intelligence: string;
  };
  Configuration: {
    daysToPlay: [];
    timeToPlay: string;
    exposed: string;
  };
  PersonalDetails: {
    age: number;
    birthplace: string;
    class: string;
    genre: string;
    name: string;
    origin: string;
    patent: string;
    placeResidence: string;
    player: string;
  };
  Status: {
    currentEffort: number;
    currentLife: number;
    currentSanity: number;
    defense: number;
    displacement: number;
    dying: boolean;
    maddened: boolean;
    maximumEffort: number;
    maximumLife: number;
    maximumSanity: number;
    nex: number;
    protection: number;
    resistance: number;
    seriousInjury: boolean;
    traumatized: boolean;
    unconscious: boolean;
  };
  background: string;
  dinner: number;
  imgUrl: string;
  investigation: string;
  uid: string;
  user: string;
  identificationNumber: number;
}

export interface IIdentidication {
  record: IRecord;
}

export interface ISection {
  creatures: [];
  initiative: [];
  name: string;
  npc: [];
  players: string[];
  uid: string;
  user: string;
  description: string;
  imgUrl?: string;
}

export interface IPropsSection {
  section: ISection;
}

export interface IInitiative {
  name: string;
  initiative: number;
}

export interface ISheetsArray {
  Attributes: {
    agility: number;
    presence: string;
    energy: string;
    force: string;
    intelligence: string;
  };
  Configuration: {
    daysToPlay: any;
    timeToPlay: string;
    exposed: string;
  };
  PersonalDetails: {
    age: number;
    birthplace: string;
    class: string;
    genre: string;
    name: string;
    origin: string;
    patent: string;
    placeResidence: string;
    player: string;
  };
  Status: {
    currentEffort: number;
    currentLife: number;
    currentSanity: number;
    defense: number;
    displacement: number;
    dying: boolean;
    maddened: boolean;
    maximumEffort: number;
    maximumLife: number;
    maximumSanity: number;
    nex: number;
    protection: number;
    resistance: number;
    seriousInjury: boolean;
    traumatized: boolean;
    unconscious: boolean;
  };
  background: string;
  dinner: number;
  imgUrl: string;
  investigation: string;
  uid: string;
  user: string;
  arraySkills?: {
    bonus: number;
    keyAttribute: string;
    other: number;
    skillName: string;
    trained: string;
    trainedValue: number;
  }[];
}

export interface IProfile {
  name?: string;
  email: string;
  uid: string;
  photoUrl?: string;
}

export interface EditAbility {
  name: string;
  description: string;
  index: number;
}

export interface ICreatures {
  ability: [];
  attributes: {
    agility: number;
    energy: number;
    force: number;
    intelligence: number;
    presence: number;
  };
  damages: {
    name: string;
    reach: string;
    type: string;
    damage: string;
    valueTest: string;
  }[];
  defeat: number;
  description: string;
  name: string;
  resistances: {
    name: string;
    value: number;
  }[];
  skills: {
    skillName: string;
    keyAttribute: string;
    trained: string;
    trainedValue: number;
  }[];
  status: {
    currentLife: number;
    maximumLife: number;
    displacement: string;
  };
}
[];

export interface IButtonTrash {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
