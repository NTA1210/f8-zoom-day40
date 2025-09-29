import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
} from "react-router";

// Comp
import { TaskList, NewTask, EditTask } from "@/pages";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<TaskList />} />
          <Route path="new-task" element={<NewTask />} />
          <Route path="/:id/edit" element={<EditTask />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
