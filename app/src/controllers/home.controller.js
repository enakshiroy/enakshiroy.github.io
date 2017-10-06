function HomeController($scope, ProjectFactory, jQuery) {

    $scope.introData = [
        'I&rsquo;m an independent (freelance/consulting) User Interface and<br>Experience Designer based in Bangalore, India.',
        'This is dummy text. This will be replaced by actual text. <br> Will be replaced.',
        'This is another dummy text. This will also be replaced by actualy text.<br> Will be replaced.',
        'Blah blah blah'
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

    $scope.select = (project) => {
        const modal = jQuery('#myCarousel');
        const index = $scope.projects.indexOf(project);
        modal.carousel(index);
    };

    $scope.next = () => {
        // TODO: Create directive.
        const modal = jQuery('#myCarousel');
        modal.carousel('next');
    };
    $scope.prev = () => {
        // TODO: Create directive.
        const modal = jQuery('#myCarousel');
        modal.carousel('prev');
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