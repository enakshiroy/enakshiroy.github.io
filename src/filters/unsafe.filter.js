function unSafeFilter($sce) {
    return $sce.trustAsHtml;
}

module.exports = {
    name: 'unsafe',
    filter: ['$sce', unSafeFilter]
};