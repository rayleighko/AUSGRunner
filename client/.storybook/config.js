import {addParameters, configure} from '@storybook/react'
import { themes } from '@storybook/theming';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)

addParameters({
	options: {
		name: 'God Teacher',
		/**
		 * display panel that shows a list of stories
		 * @type {Boolean}
		 */
		showNav: true,
		/**
		 * display panel that shows addon configurations
		 * @type {Boolean}
		 */
		showPanel: true,
		/**
		 * where to show the addon panel
		 * @type {('bottom'|'right')}
		 */
		panelPosition: 'bottom',
		/**
		 * sorts stories
		 * @type {Boolean}
		 */
		sortStoriesByKind: false,
		/**
		 * regex for finding the hierarchy separator
		 * @example:
		 *   null - turn off hierarchy
		 *   /\// - split by `/`
		 *   /\./ - split by `.`
		 *   /\/|\./ - split by `/` or `.`
		 * @type {Regex}
		 */
		hierarchySeparator: /\/|\./,
		/**
		 * regex for finding the hierarchy root separator
		 * @example:
		 *   null - turn off multiple hierarchy roots
		 *   /\|/ - split by `|`
		 * @type {Regex}
		 */
		hierarchyRootSeparator: /\|/,
		/**
		 * sidebar tree animations
		 * @type {Boolean}
		 */
		sidebarAnimations: true,
		/**
		 * enable/disable shortcuts
		 * @type {Boolean}
		 */
		enableShortcuts: true,
		/**
		 * show/hide tool bar
		 * @type {Boolean}
		 */
		isToolshown: true,
		/**
		 * theme storybook, see link below
		 */
		theme: themes.normal,
	},
})

const loadStories = () => {
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
