import React from 'react';
import HomeProf from '../components/homeProf';
import HomeAdmin from '../components/homeAdmin';
import HomeTuteur from '../components/homeTuteur';
import HomeEtu from '../components/homeEtu';

const Home = () => {
  return (
    <div>
      {sessionStorage.getItem('role') === 'Etudiant' ? <HomeEtu /> : null}

      {sessionStorage.getItem('role') === 'Enseignant' ? <HomeProf /> : null}

      {sessionStorage.getItem('role') === 'Admin' ? <HomeAdmin /> : null}

      {sessionStorage.getItem('role') === 'Tuteur' ? <HomeTuteur /> : null}
    </div>
  );
};
export default Home;
