export interface IStatement {
  context: {
    extensions: {
      'http://schema.prometheus-x.org/extension/username': string;
      'http://schema.prometheus-x.org/extension/biography'?: string;
      'http://schema.prometheus-x.org/extension/bloom'?: string;
      'http://schema.prometheus-x.org/extension/provider'?: string;
      'http://schema.prometheus-x.org/extension/license'?: string;
      'http://schema.prometheus-x.org/extension/keywords'?: string[];
      'http://schema.prometheus-x.org/extension/publisher'?: string;
      'http://schema.prometheus-x.org/extension/author'?: string;
      'http://schema.prometheus-x.org/extension/duration': string;
      'http://schema.prometheus-x.org/extension/type':
        | 'app'
        | 'article'
        | 'book'
        | 'career-profile'
        | 'distance-learning'
        | 'ebook'
        | 'mooc'
        | 'podcast'
        | 'safety-sheet'
        | 'serious-game'
        | 'training'
        | 'tutorial'
        | 'video'
        | 'website';
      'http://schema.prometheus-x.org/extension/level': 'novice' | 'amateur' | 'intermediate' | 'confirmed' | 'expert';
    };
    language: 'en';
  };
  actor: {
    mbox: string;
    name: string;
    objectType: 'Agent';
    // account: {
    //   name: string;
    //   homePage: string;
    // };
    // objectType: 'Agent';
  };
  verb: {
    id: 'http://id.tincanapi.com/verb/reviewed' | 'https://w3id.org/xapi/dod-isd/verbs/proposed';
    display: {
      'en-US': 'reviewed' | 'proposed';
    };
  };
  object: {
    id: string;
    definition: {
      name: {
        en: string;
      };
      description: {
        en: string;
      };
    };
    objectType: 'Activity';
  };
  id?: string;
  timestamp: string;
  stored: string;
  authority: {
    objectType: 'Agent';
    name: string;
    mbox: string;
  };
  version: string;
}
