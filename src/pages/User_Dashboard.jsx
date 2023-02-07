import { useState, lazy } from 'react';
import Skills from '../components/Skills';
import Experiance from '../components/Experiance';
import Certificates from '../components/Certificates';
import "./company_dashboard.css";
import '../styles/App.css';

const Profile = lazy(() => import('../components/Profile'));



function User_Dashboard() {
  const items = [
    { id: 1, name: 'Skills' },
    { id: 2, name: 'Work Experiance' },
    { id: 3, name: 'Certificates' },
  ];

  const [active, setActive] = useState(1);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return <Skills />;
      case 2:
        return <Experiance />;
      case 3:
        return <Certificates />;
      default:
        return <h1>No option selcted</h1>;
    }
  };

  return (
    <div className='h-screen'>
      <header className='bg-white shadow'>
        <div className='max-w-9xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {items.find((item) => item.id === active).name}
          </h1>
        </div>
      </header>

      <div className='fullboard'>
        <div className='mainboard'>
          <sidebar className='sidebar'>
            {
              <>
                  <div className='sidebarboard border-4 border-solid border-gray-200 rounded-lg mt-0 mb-1 h-100'>
                    <Profile />
                    {items.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className={`text-start items textfontsize40 hover:bg-gray-300 hover:text-gray-800`}
                          onClick={(i) => {
                            setActive(item.id);
                          }}>
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                    
              </>
            }
                        
          </sidebar>
          <main className='mainpart'>
            <div className='mainpartboard border-4 border-solid border-gray-200 rounded-lg h-4/6 mx-5'>
              {ActiveItem()}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  );
}

export default User_Dashboard;
