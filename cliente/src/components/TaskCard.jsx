
export function TaskCard({tasks}){
return(
    <div key={tasks.id}>
            <h1>{tasks.title}</h1>
            <p>{tasks.description}</p>
            </div>
);
}