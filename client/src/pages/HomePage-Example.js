import React from 'react';
import List from '../components/List.js';
import './HomePage.css'

function HomePage() {
    const tasks1 = [{
        id: 1,
        title: 'Task 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        author: 'John Doe'
    }];

    const tasks2 = [{
        id: 2,
        title: 'Task 2',
        description: 'Pellentesque euismod tortor vitae consectetur volutpat.',
        author: 'Jane Smith'
    }];

    const tasks3 = [
        {
        id: 3,
        title: 'Task 3',
        description: 'Sed quis velit vel velit dictum hendrerit.',
        author: 'Bob Johnson'
    }];

    return (
        <div className="App">
            <List title="List 1" tasks={tasks1} />
            <List title="List 2" tasks={tasks2} />
            <List title="List 3" tasks={tasks3} />
        </div>
    );
}

export default HomePage;
