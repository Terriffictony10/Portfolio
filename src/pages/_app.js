import { NearContext } from '@/context';

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MyApp({ Component }) {
 

  return (
    <NearContext.Provider value="">
      <Component  />
    </NearContext.Provider>
  );
}
