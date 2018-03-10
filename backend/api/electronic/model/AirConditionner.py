class AirConditionner(object):
    def __init__(self, identifier, description, status, mcpInput, mcpOutput, addressInput, addressOutput):
        self.identifier = identifier
        self.description = description
        self.status = status
        self.mcpInput = mcpInput
        self.mcpOutput = mcpOutput
        self.addressInput = addressInput
        self.addressOutput = addressOutput
