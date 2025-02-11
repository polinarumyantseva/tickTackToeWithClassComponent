import { Component } from 'react';
import { connect } from 'react-redux';
import { selectField, selectCurrentPlayer, selectFlagIsGameEnded } from '../../store/selectors';
import { setField, setIsDraw, setIsGameEnded, setCurrentPlayer } from '../../store/actions';
import { checkWinner, hasEmptyField } from '../../utils';

class FieldContainer extends Component {
	handleSetCurrentPlayer = (item, index) => {
		const { field, isGameEnded, currentPlayer, dispatch } = this.props;

		if (item === '' && !isGameEnded) {
			const newFields = field.map((el, indx) => (field[index] = index === indx ? currentPlayer : el));
			dispatch(setField(newFields));

			if (!hasEmptyField(field)) dispatch(setIsDraw(true));

			if (checkWinner(newFields, currentPlayer)) {
				dispatch(setIsGameEnded(true));
			} else {
				const newPlayer = currentPlayer === 'X' ? '0' : 'X';

				dispatch(setCurrentPlayer(newPlayer));
			}
		}
	};

	render() {
		const { field, isGameEnded } = this.props;
		return (
			<div className="mt-8 w-64 flex flex-wrap gap-5">
				{field.map((item, index) => {
					return (
						<button
							key={index}
							onClick={() => this.handleSetCurrentPlayer(item, index)}
							className={
								'w-[70px] h-[70px] cursor-pointer text-3xl rounded border-0 bg-[#dadce0] hover:bg-[#c4c6ca] transition-colors duration-150 ease-in-out disabled:cursor-not-allowed disabled:bg-[#c5c5c5]' +
								(item === '0' ? ' ' + 'text-red-600' : '')
							}
							disabled={isGameEnded}
						>
							{item}
						</button>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	field: selectField(state),
	currentPlayer: selectCurrentPlayer(state),
	isGameEnded: selectFlagIsGameEnded(state),
});

export const Field = connect(mapStateToProps)(FieldContainer);
