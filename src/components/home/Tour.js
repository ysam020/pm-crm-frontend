import Joyride, { STATUS } from "react-joyride";
import { tourSteps } from "../../assets/data/tourSteps";

const styles = {
  options: {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 50,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#f04",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    textAlign: "left",
    width: undefined,
    zIndex: 10000,
  },
  buttonNext: {
    backgroundColor: "#111B21",
  },
  buttonBack: {
    color: "#111B21",
  },
  tooltipContainer: { textAlign: "left" },
};

function Tour(props) {
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      props.setRun(false);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={props.run}
      scrollOffset={64}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={tourSteps}
      styles={styles}
    />
  );
}

export default Tour;
