import { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Information } from './components';
import { RESTART } from './store/actions';

class AppContainer extends Component {
	handleStartAgain = () => {
		this.props.dispatch(RESTART);
	};

	render() {
		return <AppLayout handleStartAgain={this.handleStartAgain} />;
	}
}

export const App = connect()(AppContainer);

const AppLayout = ({ handleStartAgain }) => {
	return (
		<div className="text-center max-w-[950px] mx-auto">
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-4xl my-5">Игра «Крестики-Нолики»</h1>
				<div className="">
					<Field />
					<Information />
					<button
						className="w-[200px] h-[60px] cursor-pointer text-[21px] transition-colors duration-150 ease-in-out rounded border-none text-white bg-[#0f990f] mt-[30px] hover:bg-[#0b6d0b]"
						onClick={handleStartAgain}
					>
						Начать заново
					</button>
				</div>
			</div>
		</div>
	);
};
