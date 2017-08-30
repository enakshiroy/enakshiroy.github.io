function ProjectFactory($http) {
    const projectApi = 'projects.json';
    const getProjects = () => {
        return $http.get(projectApi);
    };
    return {
        getProjects
    };
}

module.exports = {
    name: 'ProjectFactory',
    factory: [
        '$http',
        ProjectFactory
    ]
};