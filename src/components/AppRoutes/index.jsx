import { BrowserRouter as Router, Routes, Route } from "react-router";

// Comp
import { TaskList, NewTask, EditTask } from "@/pages";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<TaskList />} />
          <Route path="new-task" element={<NewTask />} />
          <Route path="/:id/edit" element={<EditTask />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
