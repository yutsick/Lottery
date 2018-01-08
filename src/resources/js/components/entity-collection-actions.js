var LazyLoad = require('vanilla-lazyload');

export default class entityCollectionActions {
    constructor() {
        this.wrapper = document.getElementById('product-list');
        this.lazyload = this.lazyLoad();
        this.collectionActions();
        this.selectTable();
        this.showTable();
	}


    showOrHideAction($target, totalItems, $action) {
        if ($target.children().length >= totalItems) {
			$action.hide();
		}

        this.updateLazyLoad(true);
	}

	collectionActions() {
        let _this = this;

        $('.entity-collection-actions a').each(function () {
            let $this = $(this);
            let $target = $($this.data('target'));
            let source = $this.attr('href');
            let totalItems = $target.data('totalItems');

            _this.showOrHideAction($target, totalItems, $this);

            $this.bind('click', function (e) {

                $.ajax({
                    url: source,
                    success: function (data) {
                        $target.append(data);
                        _this.showOrHideAction($target, totalItems, $this);
                    },
                });

                e.preventDefault();

            });
        });
	}

    selectTable() {
        let _this = this;
        $('.table-select').select2({
            minimumResultsForSearch: Infinity,
            templateSelection: entityCollectionActions.format,
            templateResult: entityCollectionActions.format
        });
	}

	static format(o) {
		if (!o.id) {
			return o.text;
		} else {
			return o.text;
		}
	}

	// Show selected table
	showTable() {
        $('.table-select') .on('select2:select', function (evt) {
            var choice = evt.params.data.id;

            if (choice) {
                $('#' + choice).addClass('table-pane--active').siblings('.tab-pane').removeClass('table-pane--active');
            }
        });
	}


	lazyLoad() {
        if(this.wrapper) {
            var loading = new LazyLoad({
                container: wrapper,
            });
            return loading;
        }else {
            return false;
        }

    }

    updateLazyLoad() {
        if(this.lazyload) {
            this.lazyload.update();
        }
	}
}