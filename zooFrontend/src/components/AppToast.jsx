// components/AppToast.jsx
import { ToastContainer, Slide } from 'react-toastify';

const AppToast = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        theme="light"
        transition={Slide}
        pauseOnHover={false}
        toastClassName="bg-white text-black border border-gray-200 shadow"
        progressClassName="bg-green-500"
    />
);

export default AppToast;
