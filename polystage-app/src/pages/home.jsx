import React from 'react';
import HomeProf from '../components/homeProf';
import HomeAdmin from '../components/homeAdmin';
import HomeTuteur from '../components/homeTuteur';
import HomeEtu from '../components/homeEtu';

const Home = () => {
  return (
    <div>
      {sessionStorage.getItem('role') === 'Etudiant' ? <HomeEtu /> : <p></p>}

      {sessionStorage.getItem('role') === 'Enseignant' ? <HomeProf /> : <p></p>}

      {sessionStorage.getItem('role') === 'Admin' ? <HomeAdmin /> : <p></p>}

      {sessionStorage.getItem('role') === 'Tuteur' ? <HomeTuteur /> : <p></p>}
    </div>
  );
};
export default Home;
