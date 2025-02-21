import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';

import Header from '@/components/common/Header';
import Login from '@/components/screens/login/Login';
import Main from './components/screens/main/Main';
import { Route, Routes } from 'react-router-dom';
import AllInformation from '@/components/screens/information/AllInformation';
import Reviews from '@/components/screens/reviews/Reviews';
import EditInformation from '@/components/screens/information/editInformation/EditInformation';
import AddReview from './components/screens/reviews/AddReview';

const Popup = () => {
  const userData = useStorageSuspense(userDataStorage);
  const isUserLogged = userData && userData.isLogged;

  return (
    <div className={isUserLogged ? 'h-[600px]' : undefined}>
      <Header />
      <main className="p-4">
        {isUserLogged ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="reviews" element={<Login />} />
            <Route path="information" element={<AllInformation />} />
            <Route path="all-reviews" element={<Reviews isAllReviews />} />
            <Route path="edit-information" element={<EditInformation />} />
            <Route path="add-review" element={<AddReview />} />
          </Routes>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
