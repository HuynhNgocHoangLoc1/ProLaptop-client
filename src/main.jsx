import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './view/routers/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/accountContext';

const queryClient = new QueryClient();

// axios.defaults.baseURL = 'http://localhost:3000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider> {/* Bọc RouterProvider bằng AuthProvider */}
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={Router} />
			</Suspense>
		</AuthProvider>
	</QueryClientProvider>,
);
