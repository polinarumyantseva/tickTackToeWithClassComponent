import { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentPlayer, selectFlagIsGameEnded, selectFlagIsDraw } from '../../store/selectors';

const InformationLayout = ({ status }) => {
	return <div className="mt-8 text-2xl">{status}</div>;
};

class InformationContainer extends Component {
	render() {
		const { currentPlayer, isDraw, isGameEnded } = this.props;
		let status = '';

		if (isDraw) {
			status = 'Ничья';
		} else if (!isDraw && isGameEnded) {
			status = `Победа: ${currentPlayer}`;
		} else {
			status = `Ходит: ${currentPlayer}`;
		}

		return <InformationLayout status={status} />;
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: selectCurrentPlayer(state),
	isDraw: selectFlagIsDraw(state),
	isGameEnded: selectFlagIsGameEnded(state),
});

export const Information = connect(mapStateToProps)(InformationContainer);
