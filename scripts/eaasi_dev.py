import argparse
import subprocess
import os

description = "EaaSI Client Development and Testing CLI"

epilog =\
    """
    Command-line tools for running EaaSI tests, deploying apps, and conducting
    static code analysis.
    """

parser = argparse.ArgumentParser(description=description, epilog=epilog)

parser.add_argument(
        '--unit-tests',
        action='store_true',
        help='Runs unit tests for all EaaSI Client submodules'
        )

parser.add_argument(
        '--int-tests',
        action='store_true',
        help='Runs integration tests for all EaaSI Client submodules'
        )

parser.add_argument(
        '--e2e-tests',
        action='store_true',
        help='Runs automated UI tests for all EaaSI Client submodules'
        )

parser.add_argument(
        '--all-tests',
        action='store_true',
        help='Runs unit, integration, and automated UI tests for all EaaSI Client submodules'
        )

parser.add_argument(
        '--sonarqube',
        action='store_true',
        help='Runs SonarQube static code analysis for all submodules'
        )


class CliRunner:

    def __init__(self, args):

        self.args = args
        self.possible_args = args.__dict__.keys()
        self.tasks_to_run = []
        self.project_root = os.environ['EAASI_CLIENT_HOME']

        self.args_to_run = {
                'unit_tests': {'should_run': self.args.unit_tests, 'method': self.run_unit_tests},
                'int_tests' : {'should_run': self.args.int_tests, 'method': self.run_int_tests},
                'all_tests' : {'should_run': self.args.all_tests, 'method': self.run_all_tests},
                'e2e_tests' : {'should_run': self.args.e2e_tests, 'method': self.run_e2e_tests},
                'sonarqube' : {'should_run': self.args.sonarqube, 'method': self.run_sonarqube},
                }

    def run(self):
        for arg, to_run in self.args_to_run.items():
            state = self.args_to_run.get(arg)
            if state['should_run']:
                self.tasks_to_run.append(state['method'])

        for task in self.tasks_to_run:
            task()

    def run_unit_tests(self):
        print("Running EaaSI Client Unit Tests...")
        subprocess.run(f'cd \'{self.project_root}\' && cd eaasi-web-api && npm install && npm run test:unit', shell=True)

    def run_int_tests(self):
        print("Running EaaSI Client Integration Tests...")
        #TODO

    def run_e2e_tests(self):
        print("Running EaaSI Automated UI Tests...")
        #TODO

    def run_all_tests(self):
        print("Running EaaSI Client Unit, Integration, and Automated UI Tests...")
        #TODO

    def run_sonarqube(self):
        print("Running EaaSI Client SonarQube analysis...")
        subprocess.run(['sonar-scanner'])


args = parser.parse_args()
executor = CliRunner(args)
executor.run()
