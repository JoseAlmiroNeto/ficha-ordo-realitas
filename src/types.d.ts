declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": any;
  }
}

// declare module 'react-router-dom';

declare namespace firebase {
  interface User {
    uid: string;
    email: string | null;
  }
}