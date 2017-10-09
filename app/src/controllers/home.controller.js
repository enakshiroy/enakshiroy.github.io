function HomeController($scope, ProjectFactory, jQuery) {

    $scope.introData = [{
            text: 'I&rsquo;m an independent User Interface and Experience Designer based in Bangalore, India.',
            more: 'More'
        },
        {
            text: '<br>Primarily working with startups, I try to design beautiful, functional products and systems for businesses. I also believe in developing long-lasting relationships with my clients to ensure design plays its role as a great value-add to their products.',
            more: 'Even More'
        },
        {
            text: '<br>Umm, I also play the piano and draw medical stuff for fun. You’ll find me arguing with the many CEO’s I work with at their office spaces during the week, and usually a mountaintop on a weekend, questioning my existence.',
            more: 'Okaaay then'
        }
    ];

    /**
     * On load for controller. We'll do our basic setup in it.
     */
    const onLoad = () => {
        ProjectFactory.getProjects()
            .then((response) => {
                $scope.projects = response.data;
            }, (error) => {
                console.log('Something went terribly wrong!!');
                console.error(error);
            });
    };

    /**
     * All the projects.
     */
    $scope.projects = [];

    $scope.selectedProject = null;

    $scope.select = (project) => {
        $scope.selectedProject = project;
    };

    // All set. Let's invoke onLoad.
    onLoad();
}
module.exports = {
    name: 'HomeController',
    controller: [
        '$scope',
        'ProjectFactory',
        'jQuery',
        HomeController
    ]
};